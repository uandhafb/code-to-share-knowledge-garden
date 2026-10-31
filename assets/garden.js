// LAÇO garden runtime: one shared Hydra canvas per page, live code boxes,
// reduced motion, filters, and present mode on meetup pages.
// Never asks for the camera or the microphone.
(() => {
  "use strict";

  const canvas = document.getElementById("hydra-canvas");

  // ---------- Hydra ----------

  // Phones and small screens render at half resolution, like the main LAÇO site.
  const scale = () => (Math.min(innerWidth, innerHeight) < 700 ? 0.5 : 1) * Math.min(devicePixelRatio || 1, 1.5);
  const size = () => [Math.max(1, Math.round(innerWidth * scale())), Math.max(1, Math.round(innerHeight * scale()))];

  let hydra = null;
  let startError = "";
  if (typeof Hydra === "undefined") {
    startError = "The Hydra engine couldn't load. Check your internet connection and reload the page.";
  } else {
    try {
      const [width, height] = size();
      hydra = new Hydra({
        canvas, width, height,
        detectAudio: false, makeGlobal: true, autoLoop: false, enableStreamCapture: false,
      });
      // With our own canvas, Hydra keeps the default 300 × 150 size (blurry when stretched).
      hydra.setResolution(width, height);
    } catch (err) {
      console.error(err);
      startError = "Your browser couldn't start the visuals (WebGL isn't available).";
    }
  }

  // The LAÇO title, drawn on a hidden 2D canvas the size of the Hydra canvas
  // and loaded as s0 (the welcome sketch layers it on top).
  const titleCanvas = document.createElement("canvas");
  function drawTitle() {
    const w = canvas.width;
    const h = canvas.height;
    titleCanvas.width = w;
    titleCanvas.height = h;
    const c = titleCanvas.getContext("2d");
    const unit = Math.min(w / 7, h / 4.5);
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillStyle = "#fff";
    c.shadowColor = "rgba(0, 0, 0, 0.9)";
    c.shadowBlur = unit * 0.12;
    c.shadowOffsetX = c.shadowOffsetY = unit * 0.03;
    // Space Mono is wide: shrink a line if it would not fit the screen.
    const line = (text, style, size, y) => {
      c.font = `${style} ${size}px "Space Mono", monospace`;
      const width = c.measureText(text).width;
      if (width > w * 0.9) c.font = `${style} ${(size * w * 0.9) / width}px "Space Mono", monospace`;
      c.fillText(text, w / 2, y);
    };
    line("LAÇO", "700", unit * 1.5, h / 2 - unit * 0.75);
    line("<code to share>", "700", unit * 0.42, h / 2 + unit * 0.35);
    line("welcome to the live coding meetup!", "italic 400", unit * 0.3, h / 2 + unit * 0.95);
  }
  const loadTitle = () => {
    drawTitle();
    s0.init({ src: titleCanvas, dynamic: false });
  };

  // ---------- Errors, in plain words, under the code box ----------

  function explain(err) {
    const text = String((err && err.message) || err || "Something went wrong.").split("\n")[0];
    let m;
    if (err && err.name === "SyntaxError") return `There's a typing mistake: ${text}. Check the commas, brackets and quotes.`;
    if ((m = text.match(/^(\S+) is not defined/))) return `Hydra doesn't know “${m[1]}”. Check the spelling: names are case-sensitive.`;
    if ((m = text.match(/(\w+) is not a function/))) return `“${m[1]}” can't be used here. Check the spelling, and that it comes after a source such as osc().`;
    return text;
  }

  const setState = (box, text) => {
    const state = box && box.querySelector(".sketch-state");
    if (state) state.textContent = text;
  };

  function showError(box, message) {
    if (!box) return;
    const p = box.querySelector(".sketch-error");
    p.textContent = message;
    p.hidden = false;
    box.classList.add("has-error");
    setState(box, "");
  }

  function clearError(box) {
    if (!box) return;
    box.querySelector(".sketch-error").hidden = true;
    box.classList.remove("has-error");
  }

  // Hydra catches errors that happen while drawing (e.g. inside an arrow function)
  // and only warns in the console, every frame. Show them under the running box instead.
  let activeBox = null;
  let lastFrameError = "";
  const consoleWarn = console.warn.bind(console);
  console.warn = (...args) => {
    const [first, detail] = args;
    let message = "";
    if (first === "ERROR" || (typeof first === "string" && first.startsWith("Error during tick"))) {
      message = explain(detail);
    } else if (first === "function does not return a number") {
      message = "An arrow function has to give back a number.";
    }
    if (message) {
      if (message === lastFrameError) return;   // the same error repeats every frame
      lastFrameError = message;
      showError(activeBox, message);
    }
    consoleWarn(...args);
  };

  // ---------- Running code ----------

  let paused = false;
  let visualMode = "weather";
  let weatherController = null;
  let weatherTarget = null;
  let weatherState = null;
  let weatherGraph = false;

  const copyWeather = (value) => ({ ...value, colors: value.colors.map((color) => [...color]) });
  function setVisualMode(mode) {
    visualMode = mode;
    weatherController?.setActive(mode === "weather");
  }

  function updateWeatherState(dt) {
    if (!weatherTarget) return;
    if (!weatherState || paused) { weatherState = copyWeather(weatherTarget); return; }
    const amount = 1 - Math.exp(-dt / 2200);
    for (const key of ["speed", "cloudSpeed", "warp", "clouds", "rain"]) {
      weatherState[key] += (weatherTarget[key] - weatherState[key]) * amount;
    }
    weatherState.colors.forEach((color, i) => color.forEach((channel, j) => {
      color[j] += (weatherTarget.colors[i][j] - channel) * amount;
    }));
  }

  function showWeather() {
    setVisualMode("weather");
    markActive(null);
    if (!weatherTarget) return;
    document.body.dataset.weatherPhase = weatherTarget.phase;
    if (!weatherState || paused) weatherState = copyWeather(weatherTarget);
    const colors = weatherTarget.colors.map((color) => `rgb(${color.map((value) => Math.round(value * 255)).join(",")})`);
    canvas.style.background = `linear-gradient(160deg, ${colors.join(",")})`;
    if (!hydra) return;
    try {
      hush();
      window.speed = 1;
      render(o0);
      // Map a gently warped grayscale field between two weather-driven colors.
      // Arrow functions let the palette change without recompiling the sketch.
      osc(1.6, () => weatherState.speed, 0)
        .rotate(-Math.PI / 2)
        .modulate(noise(1.8, () => weatherState.cloudSpeed), () => weatherState.warp)
        .mult(solid(...[0, 1, 2].map((i) => () => weatherState.colors[1][i] - weatherState.colors[0][i])))
        .add(solid(...[0, 1, 2].map((i) => () => weatherState.colors[0][i])))
        .blend(noise(3, () => weatherState.cloudSpeed).color(0.45, 0.51, 0.65), () => weatherState.clouds)
        .add(osc(95, () => weatherState.speed * 8, 0).rotate(-0.22).mult(noise(12, 0.04)).color(0.65, 0.8, 0.94), () => weatherState.rain)
        .out(o0);
      weatherGraph = true;
      if (paused) hydra.tick(0);
    } catch (err) {
      console.error(err);
    }
  }

  function markActive(box) {
    document.querySelectorAll(".sketch.is-active").forEach((b) => {
      b.classList.remove("is-active");
      setState(b, "");
    });
    activeBox = box;
    if (box) {
      box.classList.add("is-active");
      setState(box, paused ? "on screen · paused" : "on screen");
    }
  }

  function run(code, box = null) {
    clearError(box);
    if (!hydra) {
      showError(box, startError);
      return;
    }
    try {
      new Function(code); // syntax check first, so a typo doesn't blank the screen
    } catch (err) {
      showError(box, explain(err));
      return;
    }
    lastFrameError = "";
    try {
      weatherGraph = false;
      hush();
      window.speed = 1;
      loadTitle();
      render(o0);
      (0, eval)(code);
    } catch (err) {
      if (visualMode === "weather") showWeather();
      showError(box, explain(err));
      return;
    }
    setVisualMode(document.body.classList.contains("presenting") ? "present" : "sketch");
    markActive(box);
    if (paused) hydra.tick(16); // one still frame
  }

  let last = performance.now();
  function frame(now) {
    const dt = Math.min(now - last, 100);
    last = now;
    if (visualMode === "weather" && !paused) updateWeatherState(dt);
    if (hydra && !paused) hydra.tick(dt);
    requestAnimationFrame(frame);
  }

  let resizeTimer;
  addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (!hydra) return;
      setResolution(...size());
      loadTitle();
      if (paused) hydra.tick(0);
    }, 150);
  });

  // ---------- Reduced motion ----------

  function setPaused(value) {
    paused = value;
    if (activeBox) setState(activeBox, paused ? "on screen · paused" : "on screen");
  }

  const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
  setPaused(motionPreference.matches);
  motionPreference.addEventListener("change", (event) => setPaused(event.matches));

  // ---------- Code boxes ----------

  const fit = (textarea) => { textarea.rows = Math.max(1, textarea.value.split("\n").length); };

  function setupBox(box, original, onEdit) {
    const code = box.querySelector(".sketch-code");
    const go = () => run(code.value, box);
    box.querySelector(".sketch-run").addEventListener("click", go);
    box.querySelector(".sketch-reset").addEventListener("click", () => {
      code.value = original();
      fit(code);
      if (onEdit) onEdit(null);
      go();
    });
    code.addEventListener("input", () => {
      fit(code);
      if (onEdit) onEdit(code.value);
    });
    code.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        go();
      }
    });
  }

  document.querySelectorAll(".page [data-sketch]").forEach((box) => {
    const original = box.querySelector(".sketch-code").value;
    setupBox(box, () => original);
  });

  if (startError) {
    const notice = document.createElement("p");
    notice.className = "notice";
    notice.textContent = startError;
    document.querySelector(".page").prepend(notice);
  }

  // ---------- Filters (garden and links) ----------

  const filters = document.querySelector(".filters");
  if (filters) {
    const topics = filters.querySelector(".filter-topics");
    const primaryButtons = filters.querySelectorAll(":scope > button");
    const visualsButton = filters.querySelector('button[data-filter="visuals"]');
    let primaryValue = "all";
    let topicValue = null;
    filters.addEventListener("click", (e) => {
      const button = e.target.closest("button[data-filter]");
      if (!button) return;
      const value = button.dataset.filter;
      if (topics?.contains(button)) {
        topicValue = value;
        topics.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
      } else {
        primaryValue = value;
        topicValue = null;
        primaryButtons.forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
        if (topics) {
          topics.hidden = value !== "visuals";
          visualsButton?.setAttribute("aria-expanded", String(!topics.hidden));
          topics.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", "false"));
        }
      }
      let visible = 0;
      document.querySelectorAll(".page [data-tags]").forEach((card) => {
        const tags = card.dataset.tags.split(" ");
        card.hidden = (primaryValue !== "all" && !tags.includes(primaryValue)) || (topicValue !== null && !tags.includes(topicValue));
        if (!card.hidden) visible++;
      });
      const empty = document.querySelector(".garden-empty");
      if (empty) empty.hidden = visible > 0;
    });
  }

  // ---------- Present mode (meetup pages) ----------

  function setupPresent(slides) {
    const overlay = document.getElementById("present");
    const $ = (selector) => overlay.querySelector(selector);
    const box = $(".present-sketch");
    const code = box.querySelector(".sketch-code");
    const edits = [];
    let index = 0;

    setupBox(box, () => slides[index].code, (value) => { edits[index] = value; });

    const setUrl = (value) => {
      const url = new URL(location.href);
      if (value === null) url.searchParams.delete("present");
      else url.searchParams.set("present", value);
      history.replaceState(null, "", url);
    };

    function show(i) {
      index = Math.max(0, Math.min(slides.length - 1, i));
      const slide = slides[index];
      $(".present-count").textContent = `${index + 1} / ${slides.length}`;
      $(".present-kind").hidden = !slide.kind;
      $(".present-kind .label").textContent = slide.kind || "";
      $(".present-title").innerHTML = slide.titleHtml;   // built from our own content at build time
      $(".present-summary").innerHTML = slide.summaryHtml;
      const open = $(".present-open");
      open.hidden = !slide.href;
      if (slide.href) open.href = slide.href;
      box.hidden = !slide.code;
      if (slide.code) {
        code.value = edits[index] ?? slide.code;
        fit(code);
        run(code.value, box);
      }
      setUrl(index + 1);
    }

    function enter(i) {
      overlay.hidden = false;
      document.body.classList.add("presenting");
      show(i);
      $(".present-next").focus();
    }

    function exit() {
      overlay.hidden = true;
      overlay.classList.remove("slide-hidden");
      document.body.classList.remove("presenting");
      setUrl(null);
      weatherGraph = false;
      showWeather();
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    }

    function toggleFullscreen() {
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
      else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => {});
    }

    document.addEventListener("click", (e) => {
      const start = e.target.closest("[data-present-from]");
      if (start) enter(Number(start.dataset.presentFrom));
    });
    $(".present-prev").addEventListener("click", () => show(index - 1));
    $(".present-next").addEventListener("click", () => show(index + 1));
    $(".present-exit").addEventListener("click", exit);

    document.addEventListener("keydown", (e) => {
      const typing = e.target.closest && e.target.closest("textarea, input, select, [contenteditable]");
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (overlay.hidden) {
        if (!typing && e.key.toLowerCase() === "p") {
          e.preventDefault();
          enter(0);
        }
        return;
      }
      if (typing) {
        if (e.key === "Escape") {
          e.preventDefault();
          e.target.blur();
        }
        return;
      }
      const key = e.key.toLowerCase();
      if (key === "arrowright" || key === "pagedown") show(index + 1);
      else if (key === "arrowleft" || key === "pageup") show(index - 1);
      else if (key === "f") toggleFullscreen();
      else if (key === "h") overlay.classList.toggle("slide-hidden");
      else if (key === "escape") exit();
      else return;
      e.preventDefault();
    });

    const start = Number(new URLSearchParams(location.search).get("present"));
    if (start >= 1) {
      enter(start - 1);
      return true;
    }
    return false;
  }

  // ---------- Start ----------

  const trailData = document.getElementById("trail-data");
  const presenting = trailData ? setupPresent(JSON.parse(trailData.textContent)) : false;

  if (!presenting) {
    const first = document.querySelector(".page [data-sketch][data-autorun]");
    if (first) run(first.querySelector(".sketch-code").value, first);
  }

  if (window.GardenWeather) {
    weatherController = window.GardenWeather.create({
      onChange(state) {
        weatherTarget = state;
        if (visualMode !== "weather") return;
        document.body.dataset.weatherPhase = state.phase;
        updateWeatherState(0);
        if (!weatherGraph) showWeather();
        else if (paused && hydra) hydra.tick(0);
      },
      onResume: showWeather,
    });
    weatherController?.setActive(visualMode === "weather");
  } else if (!presenting && !activeBox && document.body.dataset.ambient) {
    run(document.body.dataset.ambient);
  }

  // Redraw the title once the fonts have arrived.
  if (hydra && document.fonts) {
    Promise.all(['700 40px "Space Mono"', 'italic 400 40px "Space Mono"'].map((f) => document.fonts.load(f)))
      .then(() => {
        loadTitle();
        if (paused) hydra.tick(0);
      })
      .catch(() => {});
  }

  requestAnimationFrame(frame);
})();

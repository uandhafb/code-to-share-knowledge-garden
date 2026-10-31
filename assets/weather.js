// Weather and place data for the ambient Hydra background. No location permission needed.
((root) => {
  "use strict";

  const DEFAULT_PLACE = { name: "Montréal", country: "Canada", latitude: 45.5019, longitude: -73.5674, timezone: "America/Toronto" };
  const REFRESH = 15 * 60 * 1000;
  const MAX_CACHE_AGE = 24 * 60 * 60 * 1000;
  const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));
  const number = (value, fallback) => Number.isFinite(value) ? value : fallback;
  const palettes = {
    night: [[0.07, 0.09, 0.25], [0.30, 0.12, 0.48]],
    sunrise: [[1, 0.28, 0.65], [1, 0.77, 0.30]],
    day: [[0.80, 1, 0.27], [0.25, 0.89, 0.87]],
    sunset: [[1, 0.48, 0.18], [0.83, 0.20, 0.64]],
  };
  const mix = (a, b, amount) => a.map((channel, i) => channel + (b[i] - channel) * amount);
  const mixPalette = (a, b, amount) => a.map((color, i) => mix(color, b[i], amount));

  function validPlace(place) {
    if (!place || typeof place.name !== "string" || !place.name.trim() || place.name.length > 100 ||
        !Number.isFinite(place.latitude) || Math.abs(place.latitude) > 90 ||
        !Number.isFinite(place.longitude) || Math.abs(place.longitude) > 180 || typeof place.timezone !== "string") return false;
    try { new Intl.DateTimeFormat("en", { timeZone: place.timezone }); return true; } catch { return false; }
  }

  function localDate(timestamp, timezone) {
    return new Intl.DateTimeFormat("en-CA", { timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(timestamp));
  }

  function solarPalette(place, data, now) {
    const today = localDate(now, place.timezone);
    const daily = data?.daily;
    const dates = Array.isArray(daily?.time) ? daily.time : [];
    const i = dates.findIndex((timestamp) => Number.isFinite(timestamp) && Math.abs(timestamp * 1000 - now) < 3 * 86400000 && localDate(timestamp * 1000, place.timezone) === today);
    const rise = daily?.sunrise?.[i];
    const set = daily?.sunset?.[i];
    const seconds = now / 1000;
    if (Number.isFinite(rise) && Number.isFinite(set) && rise > 0 && set > rise) {
      const window = Math.min(3600, (set - rise) / 4);
      const stops = [[rise - window, "night"], [rise, "sunrise"], [rise + window, "day"], [set - window, "day"], [set, "sunset"], [set + window, "night"]];
      let palette = palettes.night;
      for (let j = 1; j < stops.length; j++) {
        if (seconds >= stops[j - 1][0] && seconds <= stops[j][0]) {
          const amount = (seconds - stops[j - 1][0]) / (stops[j][0] - stops[j - 1][0]);
          palette = mixPalette(palettes[stops[j - 1][1]], palettes[stops[j][1]], amount);
          break;
        }
      }
      const phase = Math.abs(seconds - rise) <= window ? "sunrise" : Math.abs(seconds - set) <= window ? "sunset" : seconds > rise && seconds < set ? "day" : "night";
      return { palette, phase };
    }
    // At polar latitudes sunrise/sunset may be absent. Trust the current day flag.
    if (data?.current?.is_day === 0 || data?.current?.is_day === 1) {
      const phase = data.current.is_day ? "day" : "night";
      return { palette: palettes[phase], phase };
    }
    // Offline: use local clock time, without claiming to know the actual sunrise.
    const hour = Number(new Intl.DateTimeFormat("en", { timeZone: place.timezone, hour: "numeric", hourCycle: "h23" }).format(new Date(now)));
    const phase = hour >= 5 && hour < 8 ? "morning" : hour >= 8 && hour < 17 ? "day" : hour >= 17 && hour < 20 ? "evening" : "night";
    return { palette: palettes[{ morning: "sunrise", evening: "sunset" }[phase] || phase], phase };
  }

  function visualState(place, data, now = Date.now()) {
    const { palette, phase } = solarPalette(place, data, now);
    const current = data?.current;
    const warmth = clamp((number(current?.temperature_2m, 12) - 12) / 25, -1, 1);
    const shift = [warmth * 0.11, warmth * -0.025, warmth * -0.09];
    const colors = palette.map((color) => color.map((channel, i) => clamp(channel + shift[i], 0.015, 1)));
    const rain = clamp(number(current?.precipitation, 0) / 4);
    const wind = clamp(number(current?.wind_speed_10m, 0) / 60);
    return {
      phase, colors,
      speed: 0.0015 + wind * 0.006,
      cloudSpeed: 0.012 + wind * 0.025,
      warp: 0.035 + wind * 0.08 + rain * 0.035,
      clouds: clamp(number(current?.cloud_cover, 0) / 100) * 0.16,
      rain: rain * 0.16,
    };
  }

  function weatherLabel(code) {
    if (code === 0) return "clear";
    if (code === 1) return "mostly clear";
    if (code === 2) return "partly cloudy";
    if (code === 3) return "overcast";
    if ([45, 48].includes(code)) return "fog";
    if ([51, 53, 55, 56, 57].includes(code)) return "drizzle";
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "rain";
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";
    if ([95, 96, 99].includes(code)) return "thunderstorms";
    return "weather";
  }

  const validWeather = (data) => Number.isFinite(data?.current?.time) && Number.isFinite(data.current.temperature_2m) && Number.isFinite(data.current.weather_code);
  const placeKey = (place) => `${place.latitude},${place.longitude}`;

  function create({ onChange, onResume }) {
    const $ = (id) => document.getElementById(id);
    const placeText = $("weather-place");
    if (!placeText) return null;
    const status = $("weather-status");
    const clock = $("weather-clock");
    const phaseText = $("weather-phase");
    const picker = $("weather-picker");
    const form = $("weather-search-form");
    const input = $("weather-search");
    const results = $("weather-results");
    const searchStatus = $("weather-search-status");
    const resume = $("weather-resume");
    const read = (key) => { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } };
    const save = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Private mode: keep working. */ } };

    const savedPlace = read("laco-garden-place");
    let place = validPlace(savedPlace) ? savedPlace : { ...DEFAULT_PLACE };
    let data = null;
    let fetchedAt = 0;
    let attemptedAt = 0;
    let loading = false;
    let failed = false;
    let request = 0;
    let forecastController;
    let searchController;
    let searchRequest = 0;

    const cached = read("laco-garden-weather");
    if (cached?.key === placeKey(place) && validWeather(cached.data) && Number.isFinite(cached.fetchedAt) &&
        cached.fetchedAt <= Date.now() && Date.now() - cached.fetchedAt < MAX_CACHE_AGE) {
      data = cached.data;
      fetchedAt = cached.fetchedAt;
      attemptedAt = cached.fetchedAt;
    }

    function paint() {
      const now = Date.now();
      if (data && now - fetchedAt >= MAX_CACHE_AGE) data = null;
      const visual = visualState(place, data, now);
      placeText.textContent = [place.name, place.country].filter(Boolean).join(", ");
      clock.textContent = new Intl.DateTimeFormat("en", { timeZone: place.timezone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(new Date(now));
      clock.dateTime = new Date(now).toISOString();
      phaseText.textContent = visual.phase;
      if (data) {
        status.textContent = `${Math.round(data.current.temperature_2m)}°C · ${weatherLabel(data.current.weather_code)}${failed || now - fetchedAt > REFRESH ? " · saved weather" : ""}`;
      } else {
        status.textContent = loading ? "Loading weather…" : "Weather unavailable · using local time";
      }
      onChange(visual);
    }

    async function fetchJson(url, controller) {
      const timeout = setTimeout(() => controller.abort(), 10000);
      try {
        const response = await fetch(url, { signal: controller.signal, credentials: "omit" });
        if (!response.ok) throw new Error("Service unavailable");
        const result = await response.json();
        if (result.error) throw new Error("Service unavailable");
        return result;
      } finally { clearTimeout(timeout); }
    }

    async function refresh() {
      const id = ++request;
      forecastController?.abort();
      const controller = forecastController = new AbortController();
      const selected = place;
      loading = true;
      attemptedAt = Date.now();
      paint();
      const url = new URL("https://api.open-meteo.com/v1/forecast");
      url.search = new URLSearchParams({ latitude: selected.latitude, longitude: selected.longitude,
        current: "temperature_2m,is_day,precipitation,weather_code,cloud_cover,wind_speed_10m", daily: "sunrise,sunset",
        timezone: selected.timezone, timeformat: "unixtime", forecast_days: "2" });
      try {
        const forecast = await fetchJson(url, controller);
        if (id !== request) return;
        if (!validWeather(forecast)) throw new Error("Incomplete weather");
        data = forecast;
        fetchedAt = Date.now();
        failed = false;
        save("laco-garden-weather", { key: placeKey(selected), data, fetchedAt });
      } catch {
        if (id === request) failed = true;
      } finally {
        if (id === request) { loading = false; paint(); }
      }
    }

    function selectPlace(selected) {
      place = selected;
      data = null;
      fetchedAt = 0;
      failed = false;
      save("laco-garden-place", place);
      picker.open = false;
      results.replaceChildren();
      searchStatus.textContent = "";
      picker.querySelector("summary").focus();
      refresh();
    }

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const query = input.value.trim();
      if (query.length < 2) { searchStatus.textContent = "Enter at least two characters."; return; }
      const id = ++searchRequest;
      searchController?.abort();
      const controller = searchController = new AbortController();
      results.replaceChildren();
      searchStatus.textContent = "Finding places…";
      form.setAttribute("aria-busy", "true");
      const url = new URL("https://geocoding-api.open-meteo.com/v1/search");
      url.search = new URLSearchParams({ name: query, count: "6", language: "en", format: "json" });
      try {
        const response = await fetchJson(url, controller);
        if (id !== searchRequest) return;
        const places = (Array.isArray(response.results) ? response.results : []).filter(validPlace);
        searchStatus.textContent = places.length ? "Choose a place:" : "No places found. Try another name or add the country.";
        for (const result of places) {
          const item = document.createElement("li");
          const button = document.createElement("button");
          button.type = "button";
          button.textContent = [...new Set([result.name, result.admin1, result.country].filter(Boolean))].join(", ");
          button.addEventListener("click", () => selectPlace({ name: result.name, country: result.country || "", latitude: result.latitude, longitude: result.longitude, timezone: result.timezone }));
          item.append(button);
          results.append(item);
        }
      } catch {
        if (id === searchRequest) searchStatus.textContent = "Place search is unavailable. Please try again.";
      } finally {
        if (id === searchRequest) form.removeAttribute("aria-busy");
      }
    });

    resume.addEventListener("click", () => { onResume(); picker.querySelector("summary").focus(); });
    if (data && Date.now() - fetchedAt < REFRESH) paint();
    else refresh();
    setInterval(() => {
      if (document.hidden) return;
      if (!loading && Date.now() - attemptedAt >= REFRESH) refresh();
      else paint();
    }, 60000);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden && !loading) {
        if (Date.now() - attemptedAt >= REFRESH) refresh();
        else paint();
      }
    });
    return { setActive(active) { resume.hidden = active; } };
  }

  const api = { create, visualState, validPlace, weatherLabel };
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.GardenWeather = api;
})(globalThis);

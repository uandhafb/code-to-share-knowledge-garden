// Builds the LAÇO garden into _site/ from the Markdown and YAML in content/.
// No dependencies: run `node build.mjs`, then serve _site/ (see README.md).

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const CONTENT = path.join(ROOT, "content");
const OUT = path.join(ROOT, "_site");

// Pinned engine, same version and hash as the main LAÇO site.
const HYDRA_SCRIPT = {
  src: "https://unpkg.com/hydra-synth@1.4.0/dist/hydra-synth.js",
  integrity: "sha384-/vOuuF0UsnMoxr7eN/uWmNuIDUgt5t++C+G6a+T9WpUwK3vbCAStyB5cq3IajAj0",
};

const FONTS = "https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap";

const warnings = [];
const warn = (message) => warnings.push(message);

// ---------- Small YAML reader ----------
// Supports what the garden uses: `key: value`, inline lists `[a, b]`,
// block lists (`key:` followed by `  - item` lines), and a top-level list of flat maps.

function splitList(text) {
  const items = [];
  let current = "";
  let quote = null;
  for (const ch of text) {
    if (quote) {
      if (ch === quote) quote = null;
      current += ch;
    } else if (ch === '"' || ch === "'") {
      quote = ch;
      current += ch;
    } else if (ch === ",") {
      items.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  items.push(current);
  return items.map((item) => item.trim()).filter(Boolean);
}

function parseScalar(raw) {
  raw = raw.trim();
  if (raw.startsWith('"') || raw.startsWith("'")) {
    const end = raw.indexOf(raw[0], 1);
    return raw.slice(1, end === -1 ? undefined : end);
  }
  raw = raw.replace(/(^|\s)#.*$/, "").trim();
  if (raw.startsWith("[") && raw.endsWith("]")) return splitList(raw.slice(1, -1)).map(parseScalar);
  if (/^-?\d+(\.\d+)?$/.test(raw)) return Number(raw);
  if (raw === "true" || raw === "false") return raw === "true";
  return raw;
}

function parseYaml(text, file) {
  const lines = text
    .replace(/\r/g, "")
    .split("\n")
    .filter((line) => line.trim() && !line.trim().startsWith("#"));
  const keyValue = (s) => {
    const m = s.match(/^([\w-]+):(?:\s+(.*))?$/);
    return m && [m[1], m[2] ?? ""];
  };

  if (lines.length && lines[0].startsWith("- ")) {
    const list = [];
    for (const line of lines) {
      if (line.startsWith("- ")) {
        const kv = keyValue(line.slice(2).trim());
        list.push(kv ? { [kv[0]]: parseScalar(kv[1]) } : parseScalar(line.slice(2)));
        continue;
      }
      const kv = keyValue(line.trim());
      const item = list[list.length - 1];
      if (!kv || typeof item !== "object") throw new Error(`${file}: can't read “${line.trim()}”`);
      item[kv[0]] = parseScalar(kv[1]);
    }
    return list;
  }

  const map = {};
  let listKey = null;
  for (const line of lines) {
    if (listKey && /^\s+- /.test(line)) {
      map[listKey].push(parseScalar(line.trim().slice(2)));
      continue;
    }
    const kv = keyValue(line);
    if (!kv) throw new Error(`${file}: can't read “${line.trim()}”`);
    if (kv[1] === "") {
      map[kv[0]] = [];
      listKey = kv[0];
    } else {
      map[kv[0]] = parseScalar(kv[1]);
      listKey = null;
    }
  }
  return map;
}

function readSource(file) {
  const text = fs.readFileSync(file, "utf8").replace(/\r/g, "");
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: text };
  return { data: parseYaml(m[1], path.relative(ROOT, file)), body: m[2] };
}

// ---------- Small Markdown renderer ----------
// Headings, paragraphs, lists, block quotes, tables, code fences, **bold**, *italic*,
// `code`, [links](url), and garden links: [[osc]], [[meetup:01|Meetup #1]], [[category:hydra/source#rules]].
// A ```hydra fence becomes a live, editable sketch.

const escapeHtml = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const slugify = (s) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&\w+;/g, "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-");

const stripTags = (html) => html.replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&amp;/g, "&");

function inline(text, ctx) {
  const codes = [];
  text = text.replace(/`([^`]+)`/g, (_, code) => `\u0000${codes.push(code) - 1}\u0000`);
  text = escapeHtml(text);
  text = text.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, ref, label) => ctx.link(ref.trim(), label));
  text = text.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, url) => {
    const external = /^https?:/.test(url) ? ' target="_blank" rel="noopener"' : "";
    return `<a href="${url}"${external}>${label}</a>`;
  });
  text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/(^|[^\w*])\*(?!\s)(.+?)\*(?!\w)/g, "$1<em>$2</em>");
  return text.replace(/\u0000(\d+)\u0000/g, (_, n) => `<code>${escapeHtml(codes[n])}</code>`);
}

function renderMarkdown(src, ctx) {
  const lines = src.replace(/\r/g, "").split("\n");
  const html = [];
  const isBlockStart = (l) => /^(```|#{1,4}\s|>|\s*\||[-*]\s+|\d+\.\s+|(-{3,}|\*{3,})\s*$|\{\{\w+\}\})/.test(l);
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    let m;
    if (!line.trim()) {
      i++;
    } else if ((m = line.match(/^```\s*(\w*)\s*$/))) {
      const code = [];
      for (i++; i < lines.length && !/^```\s*$/.test(lines[i]); i++) code.push(lines[i]);
      i++;
      const text = code.join("\n");
      html.push(m[1] === "hydra" ? ctx.sketch(text) : `<pre class="code"><code>${escapeHtml(text)}</code></pre>`);
    } else if ((m = line.match(/^\{\{(\w+)\}\}\s*$/))) {
      html.push(ctx.slot(m[1]));
      i++;
    } else if ((m = line.match(/^(#{1,4})\s+(.*)$/))) {
      const level = m[1].length;
      const text = inline(m[2], ctx);
      html.push(`<h${level} id="${slugify(text)}">${text}</h${level}>`);
      i++;
    } else if (/^(-{3,}|\*{3,})\s*$/.test(line)) {
      html.push("<hr>");
      i++;
    } else if (line.startsWith(">")) {
      const quote = [];
      for (; i < lines.length && lines[i].startsWith(">"); i++) quote.push(lines[i].replace(/^>\s?/, ""));
      html.push(`<blockquote>${renderMarkdown(quote.join("\n"), ctx)}</blockquote>`);
    } else if (/^\s*\|/.test(line)) {
      const rows = [];
      for (; i < lines.length && /^\s*\|/.test(lines[i]); i++) {
        rows.push(lines[i].trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim()));
      }
      const [head, , ...body] = rows;
      const cells = (row, tag) => row.map((cell) => `<${tag}>${inline(cell, ctx)}</${tag}>`).join("");
      html.push(
        `<div class="table"><table><thead><tr>${cells(head, "th")}</tr></thead>` +
          `<tbody>${body.map((row) => `<tr>${cells(row, "td")}</tr>`).join("")}</tbody></table></div>`
      );
    } else if ((m = line.match(/^([-*]|\d+\.)\s+/))) {
      const ordered = /\d/.test(m[1]);
      const marker = ordered ? /^\d+\.\s+/ : /^[-*]\s+/;
      const items = [];
      while (i < lines.length) {
        const l = lines[i];
        if (marker.test(l)) {
          items.push(l.replace(marker, ""));
          i++;
        } else if (l.trim() && /^\s{2,}/.test(l)) {
          items[items.length - 1] += "\n" + l.trim();
          i++;
        } else if (!l.trim() && marker.test(lines[i + 1] || "")) {
          i++;
        } else {
          break;
        }
      }
      const tag = ordered ? "ol" : "ul";
      html.push(`<${tag}>${items.map((item) => `<li>${inline(item, ctx).replace(/\n/g, "<br>")}</li>`).join("")}</${tag}>`);
    } else {
      const para = [];
      for (; i < lines.length && lines[i].trim() && !(para.length && isBlockStart(lines[i])); i++) para.push(lines[i].trim());
      html.push(`<p>${inline(para.join(" "), ctx)}</p>`);
    }
  }
  return html.join("\n");
}

function sketchHtml(code, { autorun = false } = {}) {
  return `<figure class="sketch" data-sketch${autorun ? " data-autorun" : ""}>
<textarea class="sketch-code" rows="${code.split("\n").length}" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" wrap="off" aria-label="Hydra code (editable)">${escapeHtml(code)}</textarea>
<div class="sketch-bar"><button class="sketch-run" type="button">Run</button><button class="sketch-reset" type="button">Reset</button><span class="sketch-hint">Ctrl/⌘ + Enter</span><span class="sketch-state" aria-live="polite"></span></div>
<p class="sketch-error" role="alert" hidden></p>
</figure>`;
}

// ---------- Load content ----------

const site = parseYaml(fs.readFileSync(path.join(CONTENT, "site.yml"), "utf8"), "content/site.yml");
const links = parseYaml(fs.readFileSync(path.join(CONTENT, "links.yml"), "utf8"), "content/links.yml");
const about = readSource(path.join(CONTENT, "about.md"));

const pages = new Map();
const looksLikeCode = (title) => /^\.?[a-z]\w*(\(\))?$/.test(title);

function addPage(key, url, kind, file) {
  const { data, body } = file ? readSource(file) : { data: {}, body: "" };
  const title = String(data.title || key);
  const page = {
    key,
    url,
    kind,
    data,
    body,
    title,
    titleHtml: looksLikeCode(title) ? `<code>${escapeHtml(title)}</code>` : escapeHtml(title),
    summary: data.summary ? String(data.summary) : "",
    firstSketch: (body.match(/^```hydra\s*\n([\s\S]*?)\n```/m) || [])[1] || "",
    file: file && path.relative(ROOT, file),
  };
  pages.set(key, page);
  return page;
}

const mdFiles = (dir) =>
  fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".md")).sort().map((f) => path.join(dir, f)) : [];
const subdirs = (dir) =>
  fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort() : [];
const base = (file) => path.basename(file, ".md");

addPage("home", "", "home", path.join(CONTENT, "home.md"));
Object.assign(addPage("links", "links/", "links"), { title: "Links", titleHtml: "Links" });

for (const file of mdFiles(path.join(CONTENT, "meetups"))) {
  const meetup = addPage(`meetup:${base(file)}`, `meetups/${base(file)}/`, "meetup", file);
  meetup.number = Number(base(file));
  meetup.crumb = `Meetup #${meetup.number}`;
}
for (const tool of subdirs(path.join(CONTENT, "categories"))) {
  for (const file of mdFiles(path.join(CONTENT, "categories", tool))) {
    Object.assign(addPage(`category:${tool}/${base(file)}`, `tools/${tool}/${base(file)}/`, "category", file), {
      tool,
      slug: base(file),
    });
  }
}
for (const tool of subdirs(path.join(CONTENT, "notes"))) {
  for (const file of mdFiles(path.join(CONTENT, "notes", tool))) {
    Object.assign(addPage(`note:${tool}/${base(file)}`, `notes/${tool}/${base(file)}/`, "note", file), {
      tool,
      slug: base(file),
    });
  }
}
const all = (kind) => [...pages.values()].filter((p) => p.kind === kind);

// Categories in order, each with its notes in the order the category lists them.
function categoriesOf(tool) {
  return all("category")
    .filter((c) => c.tool === tool)
    .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99))
    .map((category) => {
      const listed = (category.data.notes || []).map((slug) => {
        const note = pages.get(`note:${tool}/${slug}`);
        if (!note) warn(`${category.file}: lists a note “${slug}” that doesn't exist`);
        return note;
      });
      return { category, notes: listed.filter(Boolean) };
    });
}

const toolsWithNotes = [...new Set(all("note").map((n) => n.tool))].sort();
const meetups = all("meetup").sort((a, b) => a.number - b.number);
const meetupLabel = (meetup) => `Meetup #${meetup.number}`;
const meetupsOf = (page) => (page.data.meetups || []).map((n) => pages.get(`meetup:${String(n).padStart(2, "0")}`)).filter(Boolean);
const noteOrder = toolsWithNotes.flatMap((tool) => categoriesOf(tool).flatMap((c) => c.notes));
for (const note of all("note")) {
  if (!noteOrder.includes(note)) warn(`${note.file}: not listed in any category's \`notes\``);
  if (!pages.has(`category:${note.tool}/${note.data.category}`)) warn(`${note.file}: unknown category “${note.data.category}”`);
}

// The meetup a note or category belongs to (its first one), for breadcrumbs and the menu.
function homeMeetup(page) {
  if (page.kind === "meetup") return page;
  if (page.kind === "note") return meetupsOf(page)[0];
  if (page.kind === "category") {
    const notes = categoriesOf(page.tool).find((c) => c.category === page)?.notes || [];
    return notes.map((n) => meetupsOf(n)[0]).find(Boolean);
  }
  return null;
}

// ---------- Links between pages ----------

const depth = (url) => url.split("/").filter(Boolean).length;
const href = (from, to, hash = "") => ("../".repeat(depth(from.url)) + to.url || "./") + (hash ? `#${hash}` : "");
const assetHref = (from, file) => `${"../".repeat(depth(from.url))}assets/${file}?v=${assetVersion[file]}`;

function resolve(ref, from) {
  const [target, hash = ""] = ref.split("#");
  let key = target;
  if (!pages.has(key) && !key.includes(":")) key = target.includes("/") ? `note:${target}` : `note:${from.tool || "hydra"}/${target}`;
  return { page: pages.get(key), hash };
}

function makeContext(page, { autorun = true } = {}) {
  let sketches = 0;
  return {
    link(ref, label) {
      const { page: target, hash } = resolve(ref, page);
      if (!target) {
        warn(`${page.file || page.url}: broken garden link [[${ref}]]`);
        return label || escapeHtml(ref);
      }
      return `<a href="${href(page, target, hash)}">${label || target.titleHtml}</a>`;
    },
    sketch(code) {
      sketches++;
      return sketchHtml(code, { autorun: autorun && sketches === 1 });
    },
    slot(name) {
      if (!slots[name]) {
        warn(`${page.file}: unknown slot {{${name}}}`);
        return "";
      }
      return slots[name](page);
    },
  };
}

const md = (page, text, options) => renderMarkdown(text, makeContext(page, options));
const mdInline = (page, text) => inline(text, makeContext(page));

// ---------- Building blocks shared by several pages ----------

const tag = (text, kind = "") => `<span class="tag${kind ? ` tag-${kind}` : ""}">${escapeHtml(text)}</span>`;

function noteCards(from, notes) {
  return `<ul class="cards">${notes
    .map((note) => `<li><a href="${href(from, note)}">${note.titleHtml}</a><span>${mdInline(from, note.summary)}</span></li>`)
    .join("")}</ul>`;
}

function linkCards(from, items) {
  return `<ul class="link-cards">${items
    .map((link) => {
      const tags = [link.type, link.tool, link.level].filter(Boolean);
      const host = new URL(link.url).hostname.replace(/^www\./, "");
      return `<li class="link-card" data-tags="${escapeHtml(tags.join(" "))}">
<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener">${escapeHtml(link.title)}</a>
<p>${mdInline(from, link.note || "")}</p>
<p class="link-meta">${tags.map((t) => tag(t, t === link.type ? "type" : "")).join(" ")} <span class="muted">${escapeHtml(host)}</span></p>
</li>`;
    })
    .join("\n")}</ul>`;
}

for (const link of links) {
  if (!link.title || !link.url) warn(`content/links.yml: every link needs a title and a url (${JSON.stringify(link)})`);
}

// Slots: `{{name}}` on a line of its own in a Markdown body.
const slots = {
  // The notes of this meetup, as garden cards grouped by category.
  meetup_notes: (page) =>
    toolsWithNotes
      .flatMap((tool) => categoriesOf(tool))
      .map(({ category, notes }) => ({ category, notes: notes.filter((n) => meetupsOf(n).includes(page)) }))
      .filter(({ notes }) => notes.length)
      .map(({ category, notes }) => `<section class="group">
<h3><a href="${href(page, category)}">${escapeHtml(category.title)}</a></h3>
${category.summary ? `<p class="muted">${mdInline(page, category.summary)}</p>` : ""}
<ul class="garden garden-tidy">${notes.map((n) => noteCard(page, n)).join("\n")}</ul>
</section>`)
      .join("\n"),
  meetup_links: (page) => linkCards(page, links.filter((l) => (l.meetups || []).includes(page.number))),
};

// ---------- Present mode (on meetup pages) ----------
// Each entry of a meetup's `trail` is one slide: a note (osc), category:<tool>/<slug>,
// meetup:<nn> (the meetup page itself, with its first sketch), or "text: Title | one line".

const slideFor = (page, from) => ({
  kind: { note: page.data.category, category: "category", meetup: "welcome" }[page.kind] || "",
  titleHtml: page.titleHtml,
  summaryHtml: mdInline(from, page.summary),
  code: page.firstSketch,
  href: page === from ? "" : href(from, page),
});

function trailOf(meetup) {
  return (meetup.data.trail || [])
    .map((entry) => {
      entry = String(entry);
      if (entry.startsWith("text:")) {
        const [title, summary = ""] = entry.slice(5).split("|").map((s) => s.trim());
        return { page: null, slide: { kind: "", titleHtml: escapeHtml(title), summaryHtml: mdInline(meetup, summary), code: "", href: "" } };
      }
      const { page } = resolve(entry, meetup);
      if (!page) {
        warn(`${meetup.file}: trail entry “${entry}” doesn't match a page`);
        return null;
      }
      return { page, slide: slideFor(page, meetup) };
    })
    .filter(Boolean);
}

const presentOverlay = `<div class="present" id="present" hidden>
<div class="present-top">
<span class="present-count" aria-live="polite"></span>
<span class="present-keys">← → move · F fullscreen · H hide slide · Esc exit</span>
<a class="present-open" href="./">Open page</a>
<button type="button" class="present-exit">Exit</button>
</div>
<div class="present-slide">
<p class="present-kind"><span class="label label-r"></span></p>
<h2 class="present-title"></h2>
<p class="present-summary"></p>
<figure class="sketch present-sketch" data-present-sketch>
<textarea class="sketch-code" rows="1" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" wrap="off" aria-label="Hydra code (editable)"></textarea>
<div class="sketch-bar"><button class="sketch-run" type="button">Run</button><button class="sketch-reset" type="button">Reset</button><span class="sketch-hint">Ctrl/⌘ + Enter · Esc leaves the code</span><span class="sketch-state" aria-live="polite"></span></div>
<p class="sketch-error" role="alert" hidden></p>
</figure>
</div>
<div class="present-nav"><button type="button" class="present-prev" aria-label="Previous slide">←</button><button type="button" class="present-next" aria-label="Next slide">→</button></div>
</div>`;

// ---------- Page layout ----------

const section = (page) => homeMeetup(page)?.key || page.key;

function layout(page, main, { extra = "" } = {}) {
  const title = page.key === "home" ? site.title : `${stripTags(page.titleHtml)} · ${site.title}`;
  const description = page.summary || site.description;
  const nav = meetups.map((meetup) => {
    const current = section(page) === meetup.key ? ' aria-current="page"' : "";
    return `<a href="${href(page, meetup)}"${current} aria-label="${escapeHtml(meetupLabel(meetup))}">#${meetup.number}</a>`;
  }).join("");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(stripTags(mdInline(page, description)))}">
<meta property="og:title" content="${escapeHtml(title)}">
<meta name="theme-color" content="#111111">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><rect width='16' height='16' fill='%23111'/><text x='2' y='13' font-family='monospace' font-size='13' fill='%23ffe14d'>&gt;</text></svg>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<link rel="stylesheet" href="${assetHref(page, "garden.css")}">
</head>
<body class="kind-${page.kind}${onSketch(page) ? " on-sketch" : ""}" data-ambient="${escapeHtml(page.data.ambient || site.ambient)}">
<canvas id="hydra-canvas" aria-hidden="true"></canvas>
<a class="skip" href="#main">Skip to content</a>
<div class="shell">
<header class="side">
<a class="brand" href="${href(page, pages.get("home"))}">LAÇO garden</a>
<div class="side-intro">
<p class="side-text">${mdInline(page, site.tagline)}</p>
<p class="side-text">${mdInline(page, about.data.summary)}</p>
<details class="side-about"><summary>How to use this garden</summary>${md(page, about.body, { autorun: false })}</details>
</div>
<nav class="nav" aria-label="Garden">
<div class="nav-group"><span class="nav-label">Meetups</span><div class="nav-meetups">${nav}</div></div>
<div class="nav-group nav-resources">
<a href="${href(page, pages.get("links"))}"${page.key === "links" ? ' aria-current="page"' : ""}>Links</a>
<a href="${escapeHtml(site.main_site)}" target="_blank" rel="noopener">LAÇO site ↗</a>
</div>
</nav>
<div class="controls">
<button type="button" id="pause-visuals" aria-pressed="false">Pause visuals</button>
<button type="button" id="hide-text" aria-pressed="false">Hide text</button>
</div>
</header>
<div class="column">
<main id="main" class="page">
${main}
</main>
<footer class="foot">
<p>${mdInline(page, site.series_line)}</p>
<p>${mdInline(page, site.credits)}</p>
</footer>
</div>
</div>
${extra}
<script src="${HYDRA_SCRIPT.src}" integrity="${HYDRA_SCRIPT.integrity}" crossorigin="anonymous" defer></script>
<script src="${assetHref(page, "garden.js")}" defer></script>
</body>
</html>
`;
}

const crumbs = (page, trail) =>
  `<nav class="crumbs" aria-label="Breadcrumb">${trail
    .map((p) => `<a href="${href(page, p)}">${typeof p.crumb === "string" ? p.crumb : p.titleHtml}</a>`)
    .join(" / ")}</nav>`;

// ---------- Pages ----------

// Pages whose own sketch runs behind them (darker than the garden gradient).
const onSketch = (page) => (page.kind === "note" || page.kind === "category") && Boolean(page.firstSketch);

// A small, stable number from a name, so the cards land in the same place on every build.
const hash = (s) => [...s].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7);
const scatter = (s) => {
  const h = hash(s);
  return `--x:${((h % 13) - 6) / 8}rem;--y:${(((h >> 4) % 17) - 8) / 4}rem`;
};

function filtersHtml(tags, { label = "Filter", topics = [] } = {}) {
  const buttons = (items) => items.map(([value, text]) => `<button type="button" data-filter="${escapeHtml(value)}" aria-pressed="false">${escapeHtml(text)}</button>`).join("\n");
  return `<div class="filters" role="group" aria-label="${escapeHtml(label)}">
<button type="button" data-filter="all" aria-pressed="true">all</button>
${buttons(tags)}
${topics.length ? `<div class="filter-topics"><span class="filter-label">Hydra topics</span>${buttons(topics)}</div>` : ""}
</div>`;
}

// Tools supply sensible defaults; an entry can add its own browsing tags.
// Web-based means an example or tool that can be run in the browser.
function browseTags(data, tool = data.tool, sketch = false) {
  const tags = Array.isArray(data.tags) ? [...data.tags] : [];
  const medium = { hydra: "images", strudel: "sound" }[tool];
  if (medium) tags.push(medium);
  if (sketch || (medium && data.type === "tool")) tags.push("web-based");
  return [...new Set(tags)];
}

function noteCard(page, note) {
  const thumb = `thumbs/${note.tool}-${note.slug}.jpg`;
  const img = fs.existsSync(path.join(ROOT, "assets", thumb))
    ? `<img src="${"../".repeat(depth(page.url))}assets/${thumb}" alt="" width="480" height="300" loading="lazy">`
    : `<span class="g-noimg" aria-hidden="true"></span>`;
  const tags = [note.tool, note.data.category, ...browseTags(note.data, note.tool, Boolean(note.firstSketch))];
  return `<li class="g-card g-${escapeHtml(note.data.category)}" data-tags="${escapeHtml(tags.join(" "))}" style="${scatter(note.key)}">
<a href="${href(page, note)}">${img}<span class="g-title">${note.titleHtml}</span><span class="g-text">${mdInline(page, note.summary)}</span></a></li>`;
}

// The garden: every note (with a picture of its sketch) and every link, as scattered cards.
function gardenHtml(page) {
  const categories = toolsWithNotes.flatMap((tool) => categoriesOf(tool).map(({ category }) => category));
  const noteCardsHtml = noteOrder.map((note) => ({ key: note.key, html: noteCard(page, note) }));
  const linkCardsHtml = links.map((link) => ({ key: link.url, html: `<li class="g-card g-link" data-tags="${escapeHtml(["links", link.tool || "", ...browseTags(link)].join(" "))}" style="${scatter(link.url)}">
<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener"><span class="g-title">${escapeHtml(link.title)} ↗</span><span class="g-text">${escapeHtml(new URL(link.url).hostname.replace(/^www\./, ""))}</span></a></li>` }));
  const cards = [...noteCardsHtml, ...linkCardsHtml].sort((a, b) => hash(a.key) - hash(b.key));
  const primary = ["sound", "images", "web-based"];
  const custom = [...new Set([...all("note").flatMap((note) => browseTags(note.data, note.tool)), ...links.flatMap((link) => browseTags(link))])]
    .filter((value) => !primary.includes(value) && value !== "links" && !categories.some((category) => category.slug === value));
  return `${filtersHtml([...primary, ...custom].map((value) => [value, value]).concat([["links", "links"]]), {
    label: "Filter examples",
    topics: categories.map((category) => [category.slug, category.title.toLowerCase()]),
  })}
<ul class="garden">
${cards.map((c) => c.html).join("\n")}
</ul>`;
}

function renderHome(page) {
  return `<h1 class="visually-hidden">${escapeHtml(site.title)}</h1>
${gardenHtml(page)}
<article class="panel">
${md(page, page.body)}
</article>`;
}

function renderMeetup(page) {
  const d = page.data;
  const trail = trailOf(page);
  const json = JSON.stringify(trail.map((item) => item.slide)).replace(/</g, "\\u003c");
  return {
    main: `<article class="panel">
<p class="kicker"><span class="label">${meetupLabel(page)}</span></p>
<h1>${page.titleHtml}</h1>
<dl class="facts">
<dt>When</dt><dd>${escapeHtml(d.date || "")}</dd>
<dt>Where</dt><dd>${mdInline(page, d.venue || "")}</dd>
</dl>
${trail.length ? `<p><button type="button" class="present-start" data-present-from="0">Present <kbd>P</kbd></button> <span class="muted">Every step of the meetup becomes a full-screen slide with live code.</span></p>` : ""}
${md(page, page.body, { autorun: false })}
</article>`,
    extra: trail.length ? `${presentOverlay}\n<script type="application/json" id="trail-data">${json}</script>` : "",
  };
}

function renderCategory(page) {
  const notes = categoriesOf(page.tool).find((c) => c.category === page)?.notes || [];
  return `<article class="panel">
${crumbs(page, [homeMeetup(page)].filter(Boolean))}
<p class="kicker"><span class="label">Category</span></p>
<h1>${page.titleHtml}</h1>
${page.summary ? `<p class="lede">${mdInline(page, page.summary)}</p>` : ""}
${md(page, page.body)}
<h2 id="notes-in-this-category">Notes in this category</h2>
${noteCards(page, notes)}
</article>`;
}

function renderNote(page) {
  const d = page.data;
  const meetup = homeMeetup(page);
  const category = pages.get(`category:${page.tool}/${d.category}`);
  const rules = pages.get(`category:${page.tool}/source`);
  const slide = meetup ? trailOf(meetup).findIndex((item) => item.page === page) + 1 : 0;
  const related = (d.related || []).map((ref) => {
    const { page: target } = resolve(String(ref), page);
    if (!target) warn(`${page.file}: related note “${ref}” doesn't exist`);
    return target;
  }).filter(Boolean);
  const i = noteOrder.indexOf(page);
  const prev = noteOrder[i - 1]?.tool === page.tool ? noteOrder[i - 1] : null;
  const next = noteOrder[i + 1]?.tool === page.tool ? noteOrder[i + 1] : null;

  return `<article class="panel note">
${crumbs(page, [meetup, category].filter(Boolean))}
<h1 class="note-title">${page.titleHtml}</h1>
${page.summary ? `<p class="lede">${mdInline(page, page.summary)}</p>` : ""}
<p class="meta">${[
    category ? tag(category.title, d.category) : "",
    d.level ? tag(d.level) : "",
    ...meetupsOf(page).map((m) => `<a href="${href(page, m)}">${meetupLabel(m)}</a>`),
    d.author ? `<span class="muted">by ${escapeHtml(d.author)}</span>` : "",
    rules && rules !== category ? `<a href="${href(page, rules, "rules-for-every-function")}">Rules for every function</a>` : "",
    slide ? `<a href="${href(page, meetup)}?present=${slide}">Present from here</a>` : "",
  ]
    .filter(Boolean)
    .join(" · ")}</p>
${md(page, page.body)}
${related.length ? `<h2 id="see-also">See also</h2>\n<p class="chips">${related.map((r) => `<a href="${href(page, r)}">${r.titleHtml}</a>`).join(" ")}</p>` : ""}
<nav class="pager" aria-label="Previous and next note">
${prev ? `<a rel="prev" href="${href(page, prev)}">← ${prev.titleHtml}</a>` : "<span></span>"}
${next ? `<a rel="next" href="${href(page, next)}">${next.titleHtml} →</a>` : "<span></span>"}
</nav>
</article>`;
}

function renderLinks(page) {
  const tags = [...new Set([...links.map((l) => l.type), ...links.map((l) => l.tool)].filter(Boolean))];
  return `<article class="panel">
<h1>Links</h1>
<p class="lede">${mdInline(page, site.links_intro)}</p>
${filtersHtml(tags.map((tag) => [tag, tag]))}
${linkCards(page, links)}
</article>`;
}

function render404() {
  const page = { key: "404", url: "", kind: "index", data: {}, titleHtml: "Not found", summary: "" };
  return layout(
    page,
    `<article class="panel"><h1>Not found</h1><p>This page isn't in the garden. Try the <a href="./">home page</a> or <a href="meetups/01/">Meetup #1</a>.</p></article>`
  ).replace(/(href|src)="(?!https?:|data:|#)([^"]*)"/g, (_, attr, url) => `${attr}="${new URL(url, site.url).href}"`);
}

// ---------- Write _site/ ----------

const assetVersion = {};
for (const file of fs.readdirSync(path.join(ROOT, "assets")).filter((f) => fs.statSync(path.join(ROOT, "assets", f)).isFile())) {
  assetVersion[file] = crypto.createHash("sha1").update(fs.readFileSync(path.join(ROOT, "assets", file))).digest("hex").slice(0, 8);
}

if (path.basename(OUT) !== "_site") throw new Error("Refusing to clear an unexpected output folder");
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
fs.cpSync(path.join(ROOT, "assets"), path.join(OUT, "assets"), { recursive: true });
fs.writeFileSync(path.join(OUT, ".nojekyll"), "");
if (site.domain) fs.writeFileSync(path.join(OUT, "CNAME"), `${site.domain}\n`);

const write = (url, html) => {
  const dir = path.join(OUT, url);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
};

for (const page of pages.values()) {
  let html;
  switch (page.kind) {
    case "home":
      html = layout(page, renderHome(page));
      break;
    case "meetup": {
      const { main, extra } = renderMeetup(page);
      html = layout(page, main, { extra });
      break;
    }
    case "category":
      html = layout(page, renderCategory(page));
      break;
    case "note":
      html = layout(page, renderNote(page));
      break;
    case "links":
      html = layout(page, renderLinks(page));
      break;
  }
  write(page.url, html);
}
fs.writeFileSync(path.join(OUT, "404.html"), render404());

console.log(`Built ${pages.size} pages into _site/`);
if (warnings.length) {
  console.warn(`\n${warnings.length} problem(s):\n- ${warnings.join("\n- ")}`);
  process.exitCode = 1;
}

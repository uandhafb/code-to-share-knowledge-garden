# LAÇO garden

The knowledge garden of [LAÇO: code to share](https://laco.codetoshare.org), free live coding meetups at Concordia University (Montréal). It replaces slides:

- **Teaching live:** each meetup has a page (Meetup #1 to #4 for now) that turns into a full-screen present mode with live, editable code.
- **Afterwards:** participants browse the notes at home, change the numbers and run them.
- **Over time:** other presenters add notes by pull request, and the garden becomes the archive of LAÇO.

## Run it on your computer

You need [Node.js](https://nodejs.org) 18 or newer. There is nothing to install.

```sh
node build.mjs                       # builds the site into _site/
python3 -m http.server -d _site 8000 # then open http://localhost:8000
```

Run `node build.mjs` again after each change. It lists any broken garden link and fails, so mistakes are caught before they're published.

## Where things are

| Path | What |
|---|---|
| `content/notes/<tool>/<slug>.md` | one concept per note (`osc`, `noise`, `modulate`…) |
| `content/categories/<tool>/<slug>.md` | category pages (Source, Geometry…); each lists its notes in order |
| `content/meetups/<nn>.md` | one page per meetup (`01.md` to `04.md`): what happens, the tools, the notes, the links, and the trail used by present mode |
| `assets/thumbs/` | the pictures on the garden cards, one per note (see below) |
| `tools/thumbnails.cjs` | takes those pictures |
| `content/links.yml` | the curated links |
| `content/home.md`, `content/site.yml` | the home page (the garden of cards), and settings shared by every page |
| `assets/garden.js` | live sketches, reduced motion, present mode, links filter |
| `assets/weather.js` | city search, local time, weather data, and the ambient palette |
| `assets/garden.css` | the look |
| `build.mjs` | turns `content/` into `_site/` (no dependencies) |

## Add a note

1. Copy a note, e.g. `content/notes/hydra/osc.md`, and rename it.
2. Fill in the header:

   ```yaml
   ---
   title: osc
   tool: hydra
   category: source          # source | geometry | color | blend | modulate | patterns | output
   level: beginner
   summary: The striped pattern.            # one line, used in lists and present mode
   related: [noise, kaleid, color]
   meetups: [1]                             # the meetups where this note is used
   author: Your Name
   ---
   ```

3. Write the body with these sections, in this order: **Signature & defaults**, **Parameters**, **Negative values**, **Sketch**, **Try this**. "See also" is added for you from `related`.
4. Add the note's slug to the `notes:` list of its category, in `content/categories/<tool>/<category>.md`.
5. To present it, add the slug to the meetup's `trail:` (see below).
6. Take its picture for the garden card:

   ```sh
   node build.mjs
   npm install --global playwright && npx playwright install chromium   # once
   NODE_PATH="$(npm root -g)" node tools/thumbnails.cjs
   ```

A fenced block marked `hydra` becomes a live code box with a **Run** button. The first one on a page runs when the page opens, and it is also the code shown in present mode.

````md
```hydra
osc(10, 0.1, 1).out()
```
````

Link to other pages with double brackets: `[[noise]]`, `[[category:hydra/source#rules-for-every-function|the rules]]`, `[[meetup:01|Meetup #1]]`, `[[links]]`.

## Add a link

Add an entry to `content/links.yml`:

```yaml
- title: Hydra function reference
  url: https://hydra.ojack.xyz/api/
  tool: hydra
  type: docs            # docs | tutorial | talk | interview | artist | project | tool
  level: all
  meetups: [1]          # the meetups that use it (shown on those meetup pages)
  note: Interactive list of every Hydra function.
```

The Links page filters resources by **all**, **hydra**, **strudel**, or **toplap**. Set each entry's `tool` to the matching group.

The home page keeps the meetup and site navigation in the information card, with example notes in the garden. External resources appear on the Links page and the relevant meetup pages. The garden's main filters are **all**, **sound**, **visuals**, **web choreography**, and **open source**. Select **visuals** to reveal the Hydra topics and narrow the visual examples further. Selecting another main filter hides the topics; selecting **visuals** again clears the topic selection. Hydra notes default to visuals and Strudel notes to sound. An example can belong to more than one filter.

Add `tags: [web-choreography]` or `tags: [open-source]` to an example's header to include it in those categories. These tags are explicit: running in a browser alone does not make an example web choreography. Categories without examples show a short empty-state message.

Example cards use responsive grids on the home and meetup pages. Columns adapt to the available width, thumbnails keep their proportions, and titles and descriptions wrap within each card. Category and resource cards also stay within their containers on narrow screens.

## Meetup pages and present mode

Each meetup is a file in `content/meetups/` (`02.md`, `03.md`, `04.md` are placeholders until their program is ready). In the body, `{{meetup_notes}}` shows the notes tagged with that meetup, and `{{meetup_links}}` its links.

The `trail:` is the order of the meetup. Each entry is one slide: `meetup:01` (the meetup page itself, with its first sketch), `category:hydra/source`, a note (`osc`), or `"text: Title | one line"`.

On a meetup page, press **P** (or the **Present** button; every note also has a **Present from here** link):

| Key | Does |
|---|---|
| ← / → | previous / next slide |
| F | fullscreen |
| H | hide the slide to show only the visuals |
| Esc | leave the code box, then leave present mode |
| Ctrl/⌘ + Enter | run the code |

The slide number stays in the URL (`?present=5`), so a refresh keeps your place.

## How the sketches run

- One Hydra canvas per page, behind the text. Every code box sends its code to that canvas (browsers limit how many WebGL canvases a page can have).
- The engine is `hydra-synth@1.4.0` from unpkg, pinned with an integrity hash (the same as the main LAÇO site). To upgrade, change the version in `build.mjs` and update the hash.
- Before each run: `hush()`, the LAÇO title is loaded into `s0`, `render(o0)`, then the code runs. Errors show under the code box in plain words.
- No camera or microphone, ever: no `initCam()`, no audio detection.
- People who ask their system for reduced motion see still visuals. Changes to that system preference also apply while the page is open.

## Weather background

The ambient background follows **Montréal** until a visitor chooses another city under **Change place** in the information card. The city is remembered in that browser; no location permission is requested. Its local sunrise and sunset shift the palette, temperature warms or cools the colors, rain adds fine texture, and wind changes the drift.

Weather and sunrise/sunset data come from [Open-Meteo](https://open-meteo.com/en/docs); city search uses its [geocoding API](https://open-meteo.com/en/docs/geocoding-api), based on GeoNames. Conditions are refreshed every 15 minutes while the page is visible and cached between page visits. If the service is unavailable, the background uses saved weather for up to a day, then local clock time, and displays its fallback status.

Running a sketch takes over the canvas. Weather updates leave that sketch alone. **Show weather background** returns to the ambient visuals, and exiting presentation mode also returns to them. The system's reduced-motion preference applies to both modes.

Check the time-zone and weather mappings with `node --test tests/weather.test.cjs`.

## Publishing

GitHub Actions builds the site and publishes it to GitHub Pages on every push to `main` (`.github/workflows/pages.yml`). Pull requests are built too, so a broken link shows up before merging. In the repository settings, set **Pages → Source** to **GitHub Actions**.

To use a custom domain, set `domain` and `url` in `content/site.yml` and add the DNS record.

## Credits

Made with [Strudel](https://strudel.cc) and [Hydra](https://hydra.ojack.xyz) (both AGPL-3.0). Inspired by [strudel-pie](https://github.com/vigliensoni/strudel-pie) by Gabriel Vigliensoni. Hydra was created by [Olivia Jack](https://ojack.xyz).

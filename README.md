# Urban Shapers

A visual, scroll-driven presentation site for **Urban Shapers** — a platform exploring
the ways cities shape us, and how we shape our cities.

> Cities shape us, and we shape our cities.

It introduces the project, the **Urban Shapers Podcast** (linked to Spotify & Apple
Podcasts), and the newsletter **The City Between Us** (Substack). Fully **bilingual
(EN / ES)** with a one-click language toggle.

## Tech

Pure static site — no build step, no dependencies.

- `index.html` — structure & bilingual content (`data-en` / `data-es` attributes)
- `css/styles.css` — design system, layout, animations
- `js/script.js` — loader, smooth reveals, language toggle, custom cursor, parallax
- `assets/` — favicon and any media

Inspired in feel by bold kinetic agency sites, dressed in the Urban Shapers palette
(cream / orange / lime / red / blue / pink) with playful illustrative SVGs.

## Run locally

It's static, so just open `index.html`, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Customizing

- **Links:** update the Spotify / Apple Podcasts / Substack / Instagram URLs in
  `index.html` (search for `open.spotify.com`, `podcasts.apple.com`, `substack.com`,
  `instagram.com`) once you have the final destinations.
- **Language:** every visible string lives in `data-en` / `data-es` attributes on its
  element. Edit both to keep the two languages in sync.
- **Hero video:** there's a commented `<video class="hero__video">` slot at the top of
  the `.hero` section. If you generate a hero clip (e.g. with an AI video tool), drop the
  file in `assets/` and uncomment that line — the styling is already wired up.
- **Colors:** all defined as CSS variables at the top of `css/styles.css`.

## Deploy

Works on any static host. For **GitHub Pages**: push, then enable Pages on this branch
(root). No configuration needed.

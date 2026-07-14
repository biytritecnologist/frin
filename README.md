# Frin CSS

> A tiny, themeable, accessible component CSS framework. Pure CSS, no build step, mobile-first.

Frin CSS gives you a small set of well-built UI components styled entirely with
**CSS custom properties**, so you can re-theme the whole framework by overriding a
handful of variables. Every class is prefixed with `frin-` to avoid collisions with
your own styles.

- 🎨 **Themeable** — all colors, spacing, radii and shadows are variables
- 🌗 **Light / dark** — built-in dark theme via `data-theme="dark"`
- ♿ **Accessible** — visible focus rings, ARIA-friendly markup, reduced-motion support
- 📱 **Mobile-first** — responsive grid & components by default
- 🪶 **Small** — ~25 KB minified, zero dependencies, zero JavaScript required*

\*JavaScript is only needed for progressive enhancement (modals, dropdowns, tabs,
navbar toggle). Components render fine without it.

---

## Installation

### CDN (quickest)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/biytritecnologist/frin@v1.0.0/dist/frin.min.css" />
```

Optional JS for interactive components:

```html
<script src="https://cdn.jsdelivr.net/gh/biytritecnologist/frin@v1.0.0/dist/frin.min.js"></script>
```

### Download / npm

```bash
npm install frin-css
# or just copy dist/frin.css into your project
```

Then import the prebuilt file:

```html
<link rel="stylesheet" href="dist/frin.css" />
```

### Source build

The `dist/` files are assembled from `src/`. No bundler required — they are plain
concatenations of the source files. To rebuild after editing sources, concatenate
`src/tokens/variables.css`, `src/base.css` and everything in `src/components/`.

---

## Quick start

```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="dist/frin.css" />
</head>
<body>
  <main class="frin-container frin-mt-5">
    <div class="frin-card frin-card--raised">
      <div class="frin-card__body">
        <h3 class="frin-card__title">Hello Frin</h3>
        <p>Build UIs without a build step.</p>
        <button class="frin-btn frin-btn--primary">Get started</button>
      </div>
    </div>
  </main>
</body>
</html>
```

Open `index.html` in this repo for a full live demo of every component.

---

## Components & class reference

All classes use the `frin-` prefix. Variant modifiers use BEM-style double dashes
(`--variant`); state classes are unprefixed (`is-active`, `is-disabled`, `is-open`).

| Component   | Base class                      | Common modifiers / states                                              |
| ----------- | ------------------------------- | ---------------------------------------------------------------------- |
| Layout      | `frin-container`, `frin-row`, `frin-col`, `frin-col-1…12` | `frin-container--fluid`, `frin-col--auto` |
| Buttons     | `frin-btn`                      | `--primary`, `--secondary`, `--outline`, `--ghost`, `--sm`, `--lg`, `--block`; `is-disabled` / `[disabled]` |
| Cards       | `frin-card`                     | `--raised`, `--flush`; `__header` `__body` `__footer` `__title` `__subtitle` `__media` |
| Navbar      | `frin-navbar`                   | `--sticky`; `__brand` `__nav` `__link` `__toggle`; `is-open`, `is-active` |
| Forms       | `frin-form`, `frin-form-group`, `frin-label`, `frin-input`, `frin-textarea`, `frin-select`, `frin-check`, `frin-radio` | `--invalid`, `--valid`; `.frin-form-hint`, `.frin-form-hint--invalid/--valid` |
| Alerts      | `frin-alert`                    | `--info`, `--success`, `--warning`, `--danger`; `__title` `__close`    |
| Badges      | `frin-badge`                    | `--primary`, `--secondary`, `--success`, `--warning`, `--danger`, `--info`, `--soft` |
| Modal       | `frin-modal`                    | `__dialog` `__header` `__body` `__footer` `__title` `__close`; `is-open` (open via `data-frin-open-modal="#id"`) |
| Dropdown    | `frin-dropdown`                 | `__toggle` `__menu` `__item` `__divider`; `is-open`, `is-active`       |
| Tabs        | `frin-tabs`                     | `__list` `__tab` `__panel`; `is-active`                                |
| Tooltip     | `frin-tooltip`                  | `__bubble`; `data-side="top|right|bottom|left"`                        |
| Pagination  | `frin-pagination`               | `__item` `__link`; `is-active`, `[aria-disabled]`                      |
| Table       | `frin-table`                    | `--striped`, `--bordered`, `--hover`, `--sm`; wrap with `frin-table-wrapper` |

### Utility helpers

`frin-d-flex`, `frin-d-block`, `frin-d-grid`, `frin-flex-col`, `frin-items-center`,
`frin-justify-between`, `frin-justify-center`, `frin-gap-2/4/5`,
`frin-text-center`, `frin-text-muted`, `frin-mt-4/5`, `frin-mb-4/5`,
`frin-sr-only`.

---

## Customization

Everything is a CSS variable. Override any of them **after** you import Frin CSS —
you never need to edit the core files.

```css
/* Your theme.css */
:root {
  --frin-color-primary: #7c3aed;      /* change accent   */
  --frin-radius-md: 4px;              /* sharper corners */
  --frin-font-family: "Inter", sans-serif;
  --frin-space-4: 1.25rem;           /* tweak spacing   */
}

/* Dark mode overrides */
[data-theme="dark"] {
  --frin-color-bg: #0d1424;
  --frin-color-surface: #16203a;
}
```

Activate dark mode by adding `data-theme="dark"` to `<html>` or `<body>`:

```html
<html data-theme="dark">
```

See `src/tokens/variables.css` for the full list of available variables.

---

## Project structure

```
/frin-css
  /dist
    frin.css          # readable, concatenated source
    frin.min.css      # minified
    frin.js           # optional progressive-enhancement JS
    frin.min.js
  /src
    variables.css     # theme entry point (imports tokens)
    base.css          # reset + base + grid/layout
    /tokens
      variables.css   # design tokens (colors, spacing, type, radius, shadow)
    /components
      buttons.css forms.css card.css navbar.css alerts.css
      modal.css dropdown.css tabs.css tooltip.css pagination.css table.css
    frin.js
  index.html          # live demo / documentation
  README.md
  LICENSE
```

---

## Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). Uses
`color-mix()`, `:focus-visible` and CSS custom properties; progressive fallbacks
are provided where practical. Reduced-motion is respected.

---

## Contributing

Contributions are welcome!

1. Fork the repo and create a feature branch (`git checkout -b feat/my-component`).
2. Add or edit component CSS under `src/components/` and tokens under `src/tokens/`.
   - Keep the `frin-` prefix; use BEM-style `--modifier` and unprefixed `is-*` states.
   - Keep it accessible (focus states, contrast, ARIA where relevant).
   - Keep it small — no utility soup, no bloat.
3. Rebuild `dist/` by concatenating sources (see "Source build" above).
4. Update `index.html` demo and this README if you add a component.
5. Open a PR with a clear description.

Please run the demo page in a browser and check light + dark themes before submitting.

---

## License

[MIT](./LICENSE) © Frin CSS contributors

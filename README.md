# SuperKart — Business Landing Page (HTML/CSS/JS)

The public marketing site for SuperKart: Home, Services, Pricing, About, and
Contact. Plain HTML, CSS, and JavaScript, no framework or build step.

This is project 1 of 4 in the SuperKart platform:

1. **Business landing page** (this repo) — marketing site
2. **Marketplace** — customer-facing storefront browsing, search, checkout
3. **Vendor dashboard** — store and product management for vendors
4. **Superadmin dashboard** — ASBData's internal platform management

It talks to a small backend (`superkart-api`, a separate repo) for the
contact form. See that repo for the API and its own deployment instructions.

## Running locally

Because the navbar and footer are loaded at runtime via `fetch()` (see
`js/include.js`), this site needs to be served over HTTP, not opened
directly as a `file://` path, or the browser will block those requests.
Any static file server works:

```bash
# Option 1: Python (built into most systems)
python3 -m http.server 8080

# Option 2: Node
npx serve .
```

Then open `http://localhost:8080/index.html`.

## Project structure

```
index.html, about.html, services.html, pricing.html, contact.html, 404.html
css/
  base.css        Design tokens (colors, fonts) and resets
  layout.css      Navbar and footer
  components.css  Hero, cards, pricing, FAQ, forms
  icons.css       Icon badges and illustration panel styles
js/
  config.js       API_BASE_URL and other cross-app links, per environment
  include.js      Loads the shared navbar/footer partials into every page
  contact.js      Contact form submission logic (calls the backend API)
  icons.js        Shared SVG icon library, injected via data-icon attributes
partials/
  navbar.html     Shared navbar markup, injected via include.js
  footer.html     Shared footer markup, injected via include.js
assets/
  logo.png            Full logo lockup, used in navbar/footer
  favicon.png         Cropped icon-only version of the logo
  hero-phone-market.png   Hero visual: app on a phone + market scene + card graphic
```

## Connecting to the backend

The contact form (`contact.html` + `js/contact.js`) submits to
`POST {API_BASE_URL}/api/contact`. `API_BASE_URL` is set in `js/config.js`
and automatically switches between `localhost:5000` (for local dev, when
`superkart-api` is running locally) and your production Render URL.

**Before deploying**, update the production URL in `js/config.js`:

```js
export const API_BASE_URL = isLocalhost
  ? "http://localhost:5000"
  : "https://your-real-render-url.onrender.com"; // update this
```

And make sure that same frontend domain is added to `ALLOWED_ORIGINS` in the
backend's environment variables, or the browser will be blocked by CORS.

## Security notes for this frontend

- The contact form includes a hidden honeypot field and a render-timestamp,
  both used by the backend to quietly discard likely bot submissions.
- All real validation happens server-side; anything checked here (e.g.
  `required`, `minlength` on inputs) is a UX nicety, not a security boundary.
- No API keys or secrets belong in this codebase; it's a public, static site
  and everything here is visible to anyone who views source.

## Before going live

- Update `js/config.js` with real API, marketplace, and vendor-portal URLs.
- Update the placeholder social links in `partials/footer.html`.
- Update contact details in `partials/footer.html` and `contact.html`.
- Replace the illustration panels with real photography (see "Icons and
  imagery" below).

## Design tokens

Colors and fonts are defined once in `css/base.css`, and icon/illustration
styles live in `css/icons.css`. Brand colors were sampled directly from the
logo file:

- Navy `#104377` — primary brand color
- Orange `#EE601C` — accent / calls to action

Fonts use the operating system's native UI font (San Francisco on Apple
devices, Segoe UI on Windows, Roboto on Android) via a system-font stack
rather than a webfont. This means zero font-loading network requests, text
renders instantly, and everything looks native to whatever device it's
viewed on. I couldn't extract kasuwa.com's exact CSS through my tools to
match their specific typeface, so this was the more reliable choice over
guessing at a webfont. If you want a specific custom typeface instead,
update the `--font-display` / `--font-body` variables in `css/base.css`
and add the relevant `<link>` tag(s) to each page's `<head>`.

## Icons and imagery

Every icon on the site is a hand-written inline SVG, defined once in
`js/icons.js` and injected wherever a `data-icon="name"` attribute appears.
To add a new icon, add it to the `ICONS` object in that file.

The illustration panels (Home's two showcase sections and CTA banner, the
About hero, and two of the three Services hero panels) use real photos of
Nigerian markets and vendors, sourced from Unsplash and confirmed free to
use under the [Unsplash License](https://unsplash.com/license) (free for
commercial use, no attribution legally required, though I've credited each
photographer in the code as good practice). These are concept placeholders
you asked for, meant to be swapped for your own photography once you have
it, not final production assets.

The main hero image (`assets/hero-phone-market.png`) is a composite visual
showing the app on a phone against a market scene, with a card graphic.
It's also a placeholder concept, not a final production asset — the card
shown uses obviously fake placeholder details (no real bank name, a
generic sequential number) and isn't meant to represent any real
institution.

**Current photo credits:**
- Omotayo Tajudeen — fruit stand vendor (Home, "Run your store from anywhere")
- Tunde Buremo — Bodija Market tomato sellers, Ibadan (Home, "Find and order from verified sellers")
- Grab — motorcycle rider (Home, final CTA banner)
- Tunde Buremo — wheelbarrow of watermelons (About hero)
- Ben Iwara — food stall with plantains (Services hero strip)
- Shedrack Salami — market cart (Services hero strip)

**To swap in your own photos later:** find the `background-image:url(...)`
inline style on the relevant `.illustration` or `.cta-banner--photo` div in
`index.html`, `about.html`, or `services.html`, and replace the URL with a
path to your own image (e.g. `/assets/photos/your-photo.jpg` after adding
it to the `assets` folder). The colored overlay and icon badge will apply
automatically. When you do your own shoot, the concept each spot is going
for is:
- Vendor tending their own stall/storefront, phone or product in hand
- A busy, colorful market or bulk-trade scene (many buyers/sellers)
- Delivery in motion (a rider, a handoff, a package)

## Deploying

This is a fully static site: any static host works (Netlify, Vercel, GitHub
Pages, or a static bucket behind Render). There's no build step, just deploy
the files as they are.

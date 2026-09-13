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
  logo.png, favicon.png
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
- Swap the General Sans/Inter font links in each page's `<head>` if you'd
  rather match another reference site's exact typography (see "Design
  tokens" below).
- Replace the illustration panels with real photography (see "Icons and
  imagery" below).

## Design tokens

Colors and fonts are defined once in `css/base.css`, and icon/illustration
styles live in `css/icons.css`. Brand colors were sampled directly from the
logo file:

- Navy `#104377` — primary brand color
- Orange `#EE601C` — accent / calls to action

Fonts are **General Sans** (headings, via Fontshare) and **Inter** (body,
via Google Fonts). I couldn't extract kasuwa.com's exact CSS through my
tools, so General Sans is my closest visual match to their heading
typeface, not a confirmed exact match. If you check their site in browser
DevTools and it's a different font, swap the `<link>` tags in each page's
`<head>` and the `--font-display` / `--font-body` variables in
`css/base.css`.

## Icons and imagery

Every icon on the site is a hand-written inline SVG, defined once in
`js/icons.js` and injected wherever a `data-icon="name"` attribute appears.
To add a new icon, add it to the `ICONS` object in that file.

Photo-style sections (the illustration panels on the About and Services
pages, and the "Run your store from anywhere" panels on Home) currently use
styled gradient panels with an icon, not real photography. I didn't embed
real photos because I can't verify licensing on images from web search
results, and hotlinking to third-party sites isn't reliable or appropriate
for a commercial site.

**To swap in real photos:** replace the `.illustration` divs with an `<img>`
(the surrounding CSS already handles rounded corners and sizing). Good
free, commercial-use sources: [Unsplash](https://unsplash.com) or
[Pexels](https://pexels.com). Suggested searches per section:
- Home "Run your store from anywhere" → "small business owner phone"
- Home "Find and order from verified sellers" → "delivery package handoff"
- About hero → "Nigeria market street" or "African entrepreneur"
- Services hero strip → "storefront", "handshake business", "mobile payment"

## Deploying

This is a fully static site: any static host works (Netlify, Vercel, GitHub
Pages, or a static bucket behind Render). There's no build step, just deploy
the files as they are.

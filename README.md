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
js/
  config.js       API_BASE_URL and other cross-app links, per environment
  include.js      Loads the shared navbar/footer partials into every page
  contact.js      Contact form submission logic (calls the backend API)
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
- Swap the Sora/Manrope Google Fonts links in each page's `<head>` if you'd
  rather match another reference site's exact typography.

## Deploying

This is a fully static site: any static host works (Netlify, Vercel, GitHub
Pages, or a static bucket behind Render). There's no build step, just deploy
the files as they are.

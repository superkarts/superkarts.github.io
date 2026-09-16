# SMECart — Business Landing Page

The public marketing site for SMECart: Home, About, Services, Pricing, and
Contact, plus a 404 page. Plain HTML, CSS, and JavaScript — no framework,
no build step — following the same structure and design system as the
SuperKart reference build (superkarts/superkarts.github.io).

## What was fixed: the missing header

The header wasn't showing up because the navbar is loaded at runtime with
`fetch()` (see `js/include.js`) — and `fetch()` is blocked by the browser
when a page is opened directly from disk (`file:///...`). If you were
double-clicking `index.html` to preview it, that's almost certainly why the
header looked empty.

Two things changed to make this less confusing going forward:
1. **This is now a hard requirement, called out clearly below** — serve the
   site over `http://`, even locally.
2. **`include.js` now fails loudly instead of silently.** If the fetch ever
   fails again for any reason, you'll see an orange notice in place of the
   header telling you exactly what went wrong, instead of a blank gap.

## Running locally

Because the navbar and footer are loaded at runtime via `fetch()`, this
site needs to be served over HTTP, not opened directly as a `file://` path:

```bash
# Option 1: Python (built into most systems)
python3 -m http.server 8080

# Option 2: Node
npx serve .
```

Then open `http://localhost:8080/index.html`. This isn't a concern once
it's on GitHub Pages, since that serves everything over regular HTTP.

## Header behavior

The header is transparent and floats over the page until you scroll — most
visible on the homepage hero. `js/include.js` adds a `.scrolled` class once
`window.scrollY` passes 40px, which is what gives it a solid background.

## Project structure

```
smecart-landing/
├── index.html, about.html, services.html, pricing.html, contact.html, 404.html
├── partials/
│   ├── navbar.html     shared nav markup, injected via include.js
│   └── footer.html     shared footer markup, injected via include.js
├── css/
│   ├── base.css        design tokens (colors, fonts) and resets
│   ├── layout.css      header, footer, container/section scaffolding
│   ├── components.css  hero, cards, pricing, FAQ, forms
│   └── icons.css       icon badge and illustration panel styling
├── js/
│   ├── include.js      loads navbar/footer, active nav link, header scroll state
│   ├── icons.js         shared inline SVG icon library, injected via data-icon
│   └── main.js          FAQ accordion, pricing toggle, contact form stub
└── assets/
    └── hero.png
```

## A note on hosting paths

The SuperKart reference uses absolute paths (`/css/base.css`, `/js/include.js`)
because it's deployed as `superkarts.github.io` — a repo named exactly
`<username>.github.io`, which GitHub serves at the domain root. This
project uses **relative** paths (`css/base.css`, `js/include.js`) instead,
so it works correctly whether you deploy it at the root of your own
`<username>.github.io`, or as a project site under a path like
`<username>.github.io/smecart-landing/`. If you do end up naming this repo
exactly `<username>.github.io`, relative paths still work fine — you don't
need to change anything.

## Design tokens

Colors and fonts are defined once in `css/base.css`, matching the SuperKart
reference:

- Navy `#104377` — primary brand color, used for headings and dark sections
- Orange `#EE601C` — accent color, used for CTAs and highlights
- **General Sans** (headings, via Fontshare) and **Inter** (body, via Google
  Fonts)

## Icons

Every icon is a hand-written inline SVG, defined once in `js/icons.js` and
injected wherever a `data-icon="name"` attribute appears (e.g.
`<span class="icon-badge icon-badge--orange" data-icon="wallet"></span>`).
To add a new icon, add it to the `ICONS` object in that file.

## Before you publish — placeholder content to replace

- **Logo** — the header currently renders a coded wordmark (dark "SME" +
  orange "Cart" + a small cart icon) because the logo image didn't come
  through in the upload. Drop your real logo file into `assets/`, then
  swap the `.brand` markup in `partials/navbar.html` and
  `partials/footer.html` for an `<img>` tag — since both are shared now,
  you only need to change it there, not on every page.
- **Pricing** (`pricing.html`) — the three plans and amounts (₦0 / ₦7,500 /
  ₦18,000) are placeholders. Replace with your real plans.
- **About page stats and mission copy** — the vendor/order/city numbers are
  blank placeholders (`—`); the mission text is generic and worth making
  more specific to your actual story.
- **Testimonials on the homepage** — clearly marked as placeholders. Replace
  with real vendor/shopper quotes before launch, or remove the section.
- **Contact details** (`contact.html`) — email, phone and address are
  placeholders.
- **Contact form** — submits nowhere yet; it just shows a message on
  screen, and includes an inert honeypot field for when it is wired up.
  Since GitHub Pages can't run a backend, wire it to a form service like
  Formspree, or point it at an API once your marketplace/vendor backend is
  live.
- **Nav and CTA links** — everything with `data-external="vendorSignup"`,
  `data-external="marketplace"`, or `href="#"` is a placeholder for links
  into your other three projects (marketplace, vendor portal, superadmin).
  These aren't wired to anything yet; point them at the real URLs once
  those projects are deployed.

## Hosting on GitHub Pages

1. Create a GitHub repository for this project.
2. Push these files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/smecart-landing.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages**.
4. Under **Source**, choose **Deploy from a branch**, pick `main` and
   `/root`, then save.
5. GitHub gives you a live URL within a minute or two.

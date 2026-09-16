// Injects the shared navbar and footer partials into every page, then wires
// up the bits that depend on them (mobile menu, active link, scroll state).
// Runs as a module, so it executes after the DOM is parsed.

async function include(placeholderId, url) {
  const target = document.getElementById(placeholderId);
  if (!target) return null;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${url} responded with ${res.status}`);
    target.innerHTML = await res.text();
    return target;
  } catch (err) {
    // Most common cause: opening the page as a file:// URL, where fetch()
    // is blocked. Leaving a visible note beats a silently missing header.
    console.error("Could not load", url, err);
    target.innerHTML =
      '<div style="padding:14px 24px;background:#fef0e7;color:#ee601c;font:14px system-ui;">' +
      "Couldn't load " + url + " — serve this site over http:// (see README) rather than opening the file directly." +
      "</div>";
    return null;
  }
}

async function init() {
  const [navTarget] = await Promise.all([
    include("navbar-placeholder", "partials/navbar.html"),
    include("footer-placeholder", "partials/footer.html")
  ]);

  // Re-run icon injection in case the partials themselves carry data-icon
  // elements (they don't yet, but keeps this safe if that changes).
  if (window.SMECartIcons) window.SMECartIcons.render();

  // Footer year (footer now exists in the DOM)
  const yearEl = document.getElementById("footerYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (!navTarget) return;

  // Mark the current page's nav link active, via body[data-page]
  const page = document.body.dataset.page;
  if (page) {
    const link = navTarget.querySelector(`[data-nav="${page}"]`);
    if (link) link.classList.add("active");
  }

  // Mobile menu toggle
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => nav.classList.remove("open"))
    );
  }

  // Header stays transparent over the hero until the page scrolls.
  const header = document.getElementById("siteHeader");
  if (header) {
    const setScrolled = () => header.classList.toggle("scrolled", window.scrollY > 40);
    setScrolled();
    window.addEventListener("scroll", setScrolled, { passive: true });
  }
}

init();

import { EXTERNAL_LINKS, CONTACT } from "./config.js";

async function include(selector, url) {
  const target = document.querySelector(selector);
  if (!target) return;
  const res = await fetch(url);
  target.innerHTML = await res.text();
}

function highlightActiveLink() {
  const current = document.body.dataset.page;
  document.querySelectorAll("[data-page]").forEach((link) => {
    if (link.dataset.page === current) {
      link.setAttribute("aria-current", "page");
    }
  });
}

function wireExternalLinks() {
  document.querySelectorAll("[data-external]").forEach((el) => {
    const key = el.dataset.external;
    if (EXTERNAL_LINKS[key]) {
      el.setAttribute("href", EXTERNAL_LINKS[key]);
    }
  });
}

function wireMobileNav() {
  const toggle = document.getElementById("navToggle");
  const mobile = document.getElementById("navMobile");
  const iconOpen = document.getElementById("navIconOpen");
  const iconClose = document.getElementById("navIconClose");
  const header = document.querySelector(".navbar");
  if (!toggle || !mobile) return;

  toggle.addEventListener("click", () => {
    const isOpen = mobile.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    iconOpen.style.display = isOpen ? "none" : "block";
    iconClose.style.display = isOpen ? "block" : "none";
    // Keep the header's background visible while the mobile menu is open,
    // even if the page hasn't been scrolled, so the dropdown doesn't float
    // beneath a transparent bar.
    if (isOpen) {
      header.classList.add("navbar--scrolled");
    } else if (window.scrollY <= 12) {
      header.classList.remove("navbar--scrolled");
    }
  });

  // Close the mobile menu automatically if the viewport grows past the
  // mobile breakpoint (e.g. rotating a tablet).
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024 && mobile.classList.contains("is-open")) {
      mobile.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      iconOpen.style.display = "block";
      iconClose.style.display = "none";
    }
  });
}

function wireScrollHeader() {
  const header = document.querySelector(".navbar");
  if (!header) return;

  const THRESHOLD = 12; // px scrolled before the header gains a background

  function updateHeaderState() {
    header.classList.toggle("navbar--scrolled", window.scrollY > THRESHOLD);
  }

  updateHeaderState(); // set correct state immediately (e.g. on page reload mid-scroll)
  window.addEventListener("scroll", updateHeaderState, { passive: true });
}

function fillFooterDetails() {
  const year = document.getElementById("footerYear");
  const contact = document.getElementById("footerContact");
  if (year) year.textContent = new Date().getFullYear();
  if (contact) contact.textContent = `${CONTACT.email} \u00b7 ${CONTACT.phone} \u00b7 ${CONTACT.address}`;
}

async function init() {
  await Promise.all([
    include("#navbar-placeholder", "/partials/navbar.html"),
    include("#footer-placeholder", "/partials/footer.html"),
  ]);
  highlightActiveLink();
  wireExternalLinks();
  wireMobileNav();
  wireScrollHeader();
  fillFooterDetails();
}

init();

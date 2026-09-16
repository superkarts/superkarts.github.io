(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    // Mobile nav toggle now lives in js/include.js, since the navbar itself
    // is injected after this file's DOMContentLoaded listener would fire.

    // FAQ accordion
    document.querySelectorAll(".faq-item button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.closest(".faq-item");
        var wasOpen = item.classList.contains("open");
        item.parentElement.querySelectorAll(".faq-item").forEach(function (i) {
          i.classList.remove("open");
        });
        if (!wasOpen) item.classList.add("open");
      });
    });

    // Pricing monthly/annual toggle
    var monthlyBtn = document.getElementById("pricingMonthly");
    var annualBtn = document.getElementById("pricingAnnual");
    if (monthlyBtn && annualBtn) {
      var setMode = function (mode) {
        monthlyBtn.classList.toggle("active", mode === "monthly");
        annualBtn.classList.toggle("active", mode === "annual");
        document.querySelectorAll("[data-price-monthly]").forEach(function (el) {
          el.textContent = mode === "monthly" ? el.dataset.priceMonthly : el.dataset.priceAnnual;
        });
        document.querySelectorAll("[data-period-monthly]").forEach(function (el) {
          el.textContent = mode === "monthly" ? el.dataset.periodMonthly : el.dataset.periodAnnual;
        });
      };
      monthlyBtn.addEventListener("click", function () { setMode("monthly"); });
      annualBtn.addEventListener("click", function () { setMode("annual"); });
    }

    // Contact form — static site, no backend yet
    var contactForm = document.getElementById("contactForm");
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var msg = document.getElementById("contactFormMsg");
        if (msg) {
          msg.textContent = "Thanks — this form isn't wired up to send messages yet. Reach us directly at the email or phone number on this page in the meantime.";
          msg.classList.add("show");
        }
      });
    }
  });
})();

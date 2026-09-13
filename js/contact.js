import { API_BASE_URL } from "./config.js";

function setUp() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const submitBtn = document.getElementById("contactSubmit");
  const messageEl = document.getElementById("contactFormMessage");
  const renderedAtField = document.getElementById("formRenderedAt");

  // Used for the "submitted too fast to be human" check on the server.
  renderedAtField.value = new Date().toISOString();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    messageEl.textContent = "";
    messageEl.className = "form-message";

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // credentials omitted deliberately: this endpoint doesn't use
        // cookies, so there's nothing to send and no CSRF surface here.
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorText = Array.isArray(data.errors) ? data.errors.join(" ") : data.error;
        throw new Error(errorText || "Something went wrong. Please try again.");
      }

      messageEl.textContent = "Thanks, your message has been received. We'll get back to you shortly.";
      messageEl.classList.add("form-message--success");
      form.reset();
      renderedAtField.value = new Date().toISOString();
    } catch (err) {
      messageEl.textContent = err.message || "Something went wrong sending that. Please try again or email us directly.";
      messageEl.classList.add("form-message--error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send message";
    }
  });
}

setUp();

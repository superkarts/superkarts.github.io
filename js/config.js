// Central place for values that change between environments.
// Update API_BASE_URL once the backend is deployed to Render.
const isLocalhost = ["localhost", "127.0.0.1"].includes(window.location.hostname);

export const API_BASE_URL = isLocalhost
  ? "http://localhost:5000"
  : "https://smecart-api.onrender.com"; // TODO: replace with your real Render URL

export const EXTERNAL_LINKS = {
  marketplace: "https://marketplace.smecart.ng",
  vendorSignup: "https://vendor.smecart.ng/signup",
  vendorLogin: "https://vendor.smecart.ng/login",
};

export const CONTACT = {
  email: "hello@smecart.ng",
  supportEmail: "support@smecart.ng",
  phone: "+234 800 000 0000",
  address: "Abuja, Nigeria",
};

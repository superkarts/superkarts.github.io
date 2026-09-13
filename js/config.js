// Central place for values that change between environments.
// Update API_BASE_URL once the backend is deployed to Render.
const isLocalhost = ["localhost", "127.0.0.1"].includes(window.location.hostname);

export const API_BASE_URL = isLocalhost
  ? "http://localhost:5000"
  : "https://superkart-api.onrender.com"; // TODO: replace with your real Render URL

export const EXTERNAL_LINKS = {
  marketplace: "https://marketplace.superkart.ng",
  vendorSignup: "https://vendor.superkart.ng/signup",
  vendorLogin: "https://vendor.superkart.ng/login",
};

export const CONTACT = {
  email: "hello@superkart.ng",
  supportEmail: "support@superkart.ng",
  phone: "+234 800 000 0000",
  address: "Abuja, Nigeria",
};

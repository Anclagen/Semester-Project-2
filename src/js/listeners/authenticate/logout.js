import { storage } from "../../storage/storage.js";

/**
 * Removes access token and user profile from local storage
 */
export const logout = function () {
  storage.remove("token");
  storage.remove("profile");
  const url = window.location.href.toString();

  if (url.includes("create.html") || url.includes("profile.html")) {
    location.href = "index.html";
  }

  window.location.reload();
};

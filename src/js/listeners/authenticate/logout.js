import { storage } from "../../storage/storage.js";

/**
 * Removes access token and user profile from local storage
 */
export const logout = function () {
  storage.remove("token");
  storage.remove("profile");

  const currentPage = window.location.href;

  if (currentPage.match("/pages/")) {
    location.href = "../index.html";
  } else {
    location.href = "./index.html";
  }
};

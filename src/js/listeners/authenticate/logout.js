import { storage } from "../../storage/storage.js";

/**
 * Removes access token and user profile from local storage
 */
export const logout = function () {
  storage.remove("token");
  storage.remove("profile");
  location.href = "../index.html";
};

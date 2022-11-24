import { storage } from "../storage/storage.js";
import { logout } from "../listeners/authenticate/logout.js";

export const isUserLoggedIn = function () {
  document.querySelector("#logout-btn").addEventListener("click", logout);

  const loggedIn = document.querySelectorAll("[data-isloggedvisibility=true]");
  const loggedOut = document.querySelectorAll(
    "[data-isloggedvisibility=false]"
  );
  const isLoggedIn = storage.get("token");

  if (isLoggedIn) {
    loggedOut.forEach((item) => item.classList.add("hidden"));
  } else {
    loggedIn.forEach((item) => item.classList.add("hidden"));
  }
};

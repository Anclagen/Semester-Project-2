import { storage } from "../storage/storage.js";
import { logout } from "../listeners/authenticate/logout.js";

export const isUserLoggedIn = function () {
  document.querySelector("#logout-btn").addEventListener("click", logout);

  const loggedIn = document.querySelectorAll("[data-isLoggedVisibility=true]");
  const loggedOut = document.querySelectorAll(
    "[data-isLoggedVisibility=false]"
  );
  const isLoggedIn = storage.get("token");

  // Hide links and buttons depending on if the user is logged or not.
  if (isLoggedIn) {
    loggedOut.forEach((item) => item.classList.add("hidden"));
  } else {
    // redirect on profile and create when not logged in.
    const url = window.location.href.toString();
    if (url.includes("create.html") || url.includes("profile.html")) {
      console.log();
      location.href = "../index.html";
    }

    loggedIn.forEach((item) => item.classList.add("hidden"));
  }
};
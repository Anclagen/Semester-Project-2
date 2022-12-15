import { registerListener } from "../listeners/authenticate/register.js";
import { loginListener } from "../listeners/authenticate/login.js";

/**
 * Authentication page setup, with query string check for form state,
 * toggle button to switch between forms,
 * and listeners for login and register form.
 */
export const authenticate = () => {
  const loginForm = document.querySelector("#login-form");
  const registerForm = document.querySelector("#register-form");

  loginForm.addEventListener("submit", loginListener);
  registerForm.addEventListener("submit", registerListener);

  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);

  if (params.get("show") === "login") {
    registerForm.classList.add("hidden");
  } else {
    loginForm.classList.add("hidden");
  }

  const showLoginBtn = document.querySelector("#show-login");
  const showRegisterBtn = document.querySelector("#show-register");

  showLoginBtn.addEventListener("click", () => {
    registerForm.classList.toggle("hidden");
    loginForm.classList.toggle("hidden");
    //shift focus for keyboard users
    loginForm.email.focus();
  });

  showRegisterBtn.addEventListener("click", () => {
    registerForm.classList.toggle("hidden");
    loginForm.classList.toggle("hidden");
    //shift focus for keyboard users
    registerForm.email.focus();
  });
};

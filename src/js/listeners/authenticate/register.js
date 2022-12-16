import { register } from "../../api/authenticate/register.js";
import { login } from "../../api/authenticate/login.js";
import { storage } from "../../storage/storage.js";

/**
 * Register form function, logs in user after account creation.
 * @param {Submit} event
 */
export async function registerListener(event) {
  event.preventDefault();
  //clear errors
  const errorReporting = document.querySelector("#register-form-error");
  errorReporting.innerText = "";
  const errorReportingImage = document.querySelector("#avatar-error");
  errorReportingImage.innerText = "";

  const form = event.target;
  const formData = new FormData(form);
  const registerBody = Object.fromEntries(formData.entries());

  //check passwords match
  const errorReportingPassword = document.querySelector("#password-error");
  errorReportingPassword.innerHTML = "";
  if (registerBody.password !== registerBody.confirmPassword) {
    form.password.focus();
    errorReportingPassword.innerHTML = "Your passwords don't match.";
    return;
  }

  //delete password confirm
  delete registerBody.confirmPassword;

  // register user
  try {
    await register(registerBody);
  } catch (error) {
    //check for avatar rejection to focus input and provide localised error.
    if (error.toString().includes("Image is not accessible")) {
      form.avatar.focus();
      errorReportingImage.innerHTML = `<p class="mt-0">This image is not accessible, please try another.<p>`;
    } else {
      //return message or statusText for other errors, focus moved to email as email/username likely problems.
      errorReporting.innerHTML = `<p class="m-0">${error}</p>`;
      form.email.focus();
    }
    return;
  }

  // Login user after registration.
  try {
    delete registerBody.name;
    delete registerBody.avatar;
    const userCredentials = await login(registerBody);
    storage.set("token", userCredentials.accessToken);
    delete userCredentials.accessToken;
    storage.set("profile", userCredentials);
    location.href = "./profile.html";
  } catch {
    errorReporting.innerHTML = `<p class="m-0">An error occurred logging into your new account</p>`;
  }
}

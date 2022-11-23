import { register } from "../../api/authenticate/register.js";
import { login } from "../../api/authenticate/login.js";
import { storage } from "../../storage/storage.js";

export async function registerListener(event) {
  event.preventDefault();
  const errorReporting = document.querySelector("#register-form-error");
  const form = event.target;
  const formData = new FormData(form);
  const registerBody = Object.fromEntries(formData.entries());
  delete registerBody.confirmPassword;

  try {
    await register(registerBody);
  } catch {
    errorReporting.innerText = "An error occurred creating your account";
    return;
  }

  try {
    delete registerBody.name;
    const userCredentials = await login(registerBody);
    storage.set("token", userCredentials.accessToken);
    delete userCredentials.accessToken;
    storage.set("profile", userCredentials);
    location.href = "profile.html";
  } catch {
    errorReporting.innerText =
      "An error occurred logging into your new account";
  }
}

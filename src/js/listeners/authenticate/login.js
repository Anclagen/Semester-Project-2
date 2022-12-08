import { login } from "../../api/authenticate/login.js";
import { storage } from "../../storage/storage.js";

export async function loginListener(event) {
  event.preventDefault();
  const errorReporting = document.querySelector("#login-form-error");
  const form = event.target;
  const formData = new FormData(form);
  const loginBody = Object.fromEntries(formData.entries());

  try {
    const userCredentials = await login(loginBody);
    storage.set("token", userCredentials.accessToken);
    delete userCredentials.accessToken;
    storage.set("profile", userCredentials);
    location.href = "./profile.html";
  } catch {
    errorReporting.innerText = "Incorrect password or email.";
    return;
  }
}

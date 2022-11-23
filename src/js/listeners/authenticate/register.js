import { register } from "../../api/authenticate/register";
import { login } from "../../api/authenticate/login";
import { storage } from "../../storage/storage";

export async function registerListener(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const registerBody = Object.fromEntries(formData.entries());

  try {
    await register(registerBody);
  } catch {
    return;
  }

  try {
    delete registerBody.password - confirm;
    delete registerBody.name;
    const userCredentials = await login(registerBody);
    storage.set("token", userCredentials.accessToken);
    delete userCredentials.accessToken;
    storage.set("profile", userCredentials);
    location.href = "profile.html";
  } catch {
    return;
  }
}

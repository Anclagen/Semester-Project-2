import { login } from "../../api/authenticate/login";
import { storage } from "../../storage/storage";

export async function loginListener(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const loginBody = Object.fromEntries(formData.entries());

  try {
    const userCredentials = await login(loginBody);
    storage.set("token", userCredentials.accessToken);
    delete userCredentials.accessToken;
    storage.set("profile", userCredentials);
    location.href = "profile.html";
  } catch {
    return;
  }
}

import { updateAvatar } from "../../api/profile/updateProfile.js";

/**
 * update users avatar
 * @param {*} event
 * @returns
 */
export async function updateAvatarListener(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const requestBody = Object.fromEntries(formData.entries());
  try {
    const profile = await updateAvatar(requestBody);
    const avatar = document.querySelector("#userAvatarImage");
    avatar.src = await profile.avatar;
  } catch {
    console.log("you done fooked up!");
  }
}

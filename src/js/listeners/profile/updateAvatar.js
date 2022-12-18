import { updateAvatar } from "../../api/profile/updateProfile.js";
import { storage } from "../../storage/storage.js";

/**
 * lister to update users avatar
 * @param {Submit} event
 */
export async function updateAvatarListener(event) {
  const avatarErrorContainer = document.querySelector(
    "#avatar-error-reporting"
  );
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const requestBody = Object.fromEntries(formData.entries());
  try {
    const profile = await updateAvatar(requestBody);
    const avatar = document.querySelector("#userAvatarImage");
    const avatarNav = document.querySelector("#nav-avatar");
    avatarNav.src = avatar.src = await profile.avatar;
    storage.set("profile", await profile);
    avatarErrorContainer.innerHTML = "";
    const closeBtn = document.querySelector("#close-modal-btn");
    closeBtn.click();
  } catch (error) {
    avatarErrorContainer.innerHTML = `<p class="p-3 text-losing bg-secondary"> This was unsuccessful, please try another link, if this problem persists please contact the administrator. </p>`;
    event.target.avatar.focus();
  }
}

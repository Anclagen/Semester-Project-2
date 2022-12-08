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
    const closeBtn = document.querySelector("#close-modal-btn");
    closeBtn.click();
  } catch (error) {
    console.log(error);
    const avatarErrorContainer = document.querySelector(
      "#avatar-error-reporting"
    );
    avatarErrorContainer.innerHTML = `<p class="p-3 text-losing bg-secondary"> This was unsuccessful, please try another link, if this problem persists please contact the administrator. </p>`;
  }
}

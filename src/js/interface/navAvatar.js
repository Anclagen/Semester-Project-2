import { storage } from "../storage/storage.js";

export const updateNavAvatar = function () {
  const profile = storage.get("profile");
  const navAvatar = document.querySelector("#nav-avatar");
  const navBalance = document.querySelector("#user-balance");
  if (!profile) {
    return;
  }
  navAvatar.src = profile.avatar;
  navAvatar.alt = `${profile.name}'s avatar`;
  navBalance.classList = "border-top border-primary pt-2";
  navBalance.innerHTML = `<span class="ps-md-3 py-1 ms-1"><i class="fa-solid fa-money-bill-1-wave pe-1"></i>£${profile.credits} </span>`;
};

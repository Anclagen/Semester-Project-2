import { storage } from "../storage/storage.js";

export const updateNavAvatar = function () {
  const profile = storage.get("profile");
  const navAvatar = document.querySelector("#nav-avatar");
  if (!profile) {
    console.log(false);
  } else {
    navAvatar.src = profile.avatar;
    navAvatar.alt = `${profile.name}'s avatar`;
  }
};

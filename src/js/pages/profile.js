import { getUserProfile } from "../api/profile/getProfile.js";
import { getUserProfileListings } from "../api/profile/getProfileListings.js";
import { showSensitiveDetails } from "../interface/isUserProfile.js";
import { updateAvatarListener } from "../listeners/profile/updateAvatar.js";
import { createListingCard } from "../render/listingCard.js";
import { updateProfileDetails } from "../render/updateProfileDetails.js";
import { storage } from "../storage/storage.js";

export const profileSetup = async function () {
  const updateForm = document.querySelector("#update-avatar-form");
  updateForm.addEventListener("submit", updateAvatarListener);

  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  let user = params.get("user");
  if (user === null || user === storage.get("profile").name) {
    user = storage.get("profile").name;
    showSensitiveDetails();
  }

  const profile = await getUserProfile(user);
  const profileListings = await getUserProfileListings(user);

  updateProfileDetails(profile);
  const yourListingsContainer = document.querySelector(
    "#your-listings-container"
  );
  await profileListings.map((listing) => {
    yourListingsContainer.append(createListingCard(listing));
  });
};

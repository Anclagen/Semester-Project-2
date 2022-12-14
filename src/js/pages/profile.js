import { getUserProfile } from "../api/profile/getProfile.js";
import { getUserProfileBids } from "../api/profile/getProfileBids.js";
import { getUserProfileListings } from "../api/profile/getProfileListings.js";
import { showSensitiveDetails } from "../interface/isUserProfile.js";
import { setupAvatarPreview } from "../listeners/profile/avatar-preview.js";
import { updateAvatarListener } from "../listeners/profile/updateAvatar.js";
import { createListingCard } from "../render/listingCard.js";
import { updateProfileDetails } from "../render/updateProfileDetails.js";
import { sortFilterBidOn } from "../sort_search_filter/filterDuplicateListings.js";
import { filterWonListings } from "../sort_search_filter/filterWins.js";
import { storage } from "../storage/storage.js";
import { recentProfileCardsSetup } from "../tools/fillRecentProfileCards.js";
import { getParamURL } from "../tools/getParamsURL.js";

export const profileSetup = async function () {
  let user = getParamURL("user");

  if (user === null || user === storage.get("profile").name) {
    user = storage.get("profile").name;
    showSensitiveDetails();
    const updateForm = document.querySelector("#update-avatar-form");
    updateForm.addEventListener("submit", updateAvatarListener);
    setupAvatarPreview();
  }

  if (getParamURL("deleted")) {
    const deleteSuccessContainer = document.querySelector("#delete-success");
    deleteSuccessContainer.innerHTML = `<p class=" text-center p-2 my-2 rounded-2 text-winning bg-secondary">Listing Was Deleted.</p>`;
  }
  try {
    const profile = await getUserProfile(user);
    updateProfileDetails(profile);
    const profileBids = await getUserProfileBids(user);
    const uniqueListings = sortFilterBidOn(profileBids);
    const yourBidsContainer = document.querySelector("#ongoing-bids-container");
    if (uniqueListings.length > 0) {
      yourBidsContainer.innerHTML = "";
      uniqueListings.map((listing) => {
        const card = createListingCard(listing.card);
        card.querySelector(
          ".listing-price"
        ).innerHTML = `Your Bid: £${listing.card.bids.amount}.00`;
        yourBidsContainer.append(card);
      });
    } else {
      yourBidsContainer.innerHTML = `<p class="ps-4 py-4">Not currently bidding on anything.</p>`;
    }
    // most recent and all listings
    const profileListings = await getUserProfileListings(user);
    const yourListingsContainer = document.querySelector(
      "#your-listings-container"
    );
    const newListingsContainer = document.querySelector(
      "#newest-listings-container"
    );
    recentProfileCardsSetup(
      profileListings,
      newListingsContainer,
      yourListingsContainer,
      "User hasn't created any listings."
    );

    // most recent and all wins
    const wonListings = filterWonListings(profile, profileBids);
    const yourWinsContainer = document.querySelector("#wins-container");
    const recentWinsContainer = document.querySelector(
      "#recent-wins-container"
    );
    recentProfileCardsSetup(
      wonListings,
      recentWinsContainer,
      yourWinsContainer,
      "No wins yet."
    );
  } catch (error) {
    console.log(error);
  }
};

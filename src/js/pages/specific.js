import { getAListings } from "../api/listing/getAListing.js";
import { placeBidFormListener } from "../listeners/listing/placeBid.js";
import { addListingOptions } from "../render/specific/addListingOptions.js";
import { updateSpecificListingDetails } from "../render/specific/updateSpecificDetails.js";
import { storage } from "../storage/storage.js";
import { getParamURL } from "../tools/getParamsURL.js";

/**
 * Setup for specific page.
 */
export const specificPageSetup = async function () {
  const id = getParamURL("id");
  if (id) {
    try {
      const listingData = await getAListings(id);
      //create profile check function to set max bid.
      updateSpecificListingDetails(listingData);
      // isLoggedVisibility takes care of unregistered users
      if (listingData.seller.name !== storage.get("profile").name) {
        //if not the seller then bidding enabled and delete/update buttons hidden
        const biddingForm = document.querySelector("#bidding-form");
        biddingForm.addEventListener("submit", placeBidFormListener);
        const NotSeller = document.querySelectorAll("[data-isNotSeller=true]");
        NotSeller.forEach((item) => item.classList.add("hidden"));
      } else if (listingData.seller.name === storage.get("profile").name) {
        // hides bidding button, enables update and delete buttons
        const seller = document.querySelectorAll("[data-isNotSeller=false]");
        seller.forEach((item) => item.classList.add("hidden"));
        addListingOptions();
      }
    } catch (error) {
      console.log(error);
      const errorContainer = document.querySelector(
        "#error-reporting-container"
      );
      errorContainer.innerHTML = `<p class="p-3 text-losing bg-secondary">An error occurred please refresh and try again. Check listing still exists. </p>`;
      location.hash = "#error-reporting-container";
    }
  } else {
    location.href = "../index.html";
  }
};

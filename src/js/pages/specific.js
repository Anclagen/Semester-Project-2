import { getAListings } from "../api/listing/getAListing.js";
import { placeBidFormListener } from "../listeners/listing/placeBid.js";
import { generateErrorMessage } from "../render/errorMessages.js";
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
      const errorContainer = document.querySelector(
        "#error-reporting-container"
      );
      if (
        error.toString().includes("No listing") ||
        error.toString().includes("Invalid uuid")
      ) {
        generateErrorMessage(errorContainer, "This listing no longer exists.");
      } else {
        generateErrorMessage(errorContainer, error);
      }
    }
  } else {
    location.href = "../index.html";
  }
};

import { getAListings } from "../api/listing/getAListing.js";
import { createUpdateFormListener } from "../listeners/listing/createUpdate.js";
import { fillUpdateListingDetails } from "../render/fillUpdateListingDetails.js";
import { updatePreview } from "../render/updateListingPreview.js";
import { addMoreMedia } from "../listeners/listing/showMoreMediaInputs.js";
import { removeMediaInput } from "../listeners/listing/removeMediaInputs.js";
import { generateErrorMessage } from "../render/errorMessages.js";
import { storage } from "../storage/storage.js";

/**
 * Create page setup function
 */
export const createUpdatePageSetup = async function () {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  let id = params.get("id");

  const form = document.querySelector("#create-form");
  const H1 = document.querySelector("h1");

  const addMoreMediaBtn = document.querySelector("#add-more-media-btn");
  addMoreMediaBtn.addEventListener("click", addMoreMedia);

  const removeMediaBtn = document.querySelector("#remove-media-btn");
  removeMediaBtn.addEventListener("click", removeMediaInput);

  form.addEventListener("submit", createUpdateFormListener);
  form.addEventListener("input", updatePreview);

  const errorContainer = document.querySelector("#error-reporting-container");
  if (id) {
    H1.innerText = "Update Listing";
    try {
      const listingData = await getAListings(id);
      //
      if (listingData.seller.name === storage.get("profile").name) {
        fillUpdateListingDetails(listingData);
        form.endingAt.setAttribute("disabled", "");
        updatePreview(listingData.media);
      } else {
        generateErrorMessage(
          errorContainer,
          "This isn't your listing to update."
        );
        form.removeEventListener("submit", createUpdateFormListener);
      }
    } catch (error) {
      const stringError = error.toString();
      if (
        stringError.includes("Invalid uuid") ||
        stringError.includes("No listing with such ID")
      ) {
        generateErrorMessage(
          errorContainer,
          "An error occurred, this listing doesn't exist."
        );
      } else {
        generateErrorMessage(
          errorContainer,
          `An error occurred please refresh and try again. (${stringError})`
        );
      }
    }
  }
};

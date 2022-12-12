import { getAListings } from "../api/listing/getAListing.js";
import { createUpdateFormListener } from "../listeners/listing/createUpdate.js";
import { fillUpdateListingDetails } from "../render/fillUpdateListingDetails.js";
import { updatePreview } from "../render/updateListingPreview.js";
import { addMoreMedia } from "../listeners/listing/showMoreMediaInputs.js";
import { removeMediaInput } from "../listeners/listing/removeMediaInputs.js";

export const createUpdatePageSetup = async function () {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  let id = params.get("id");

  const form = document.querySelector("#create-form");
  const H1 = document.querySelector("h1");

  H1.innerText = "Create A Listing";

  const addMoreMediaBtn = document.querySelector("#add-more-media-btn");
  addMoreMediaBtn.addEventListener("click", addMoreMedia);

  const removeMediaBtn = document.querySelector("#remove-media-btn");
  removeMediaBtn.addEventListener("click", removeMediaInput);

  form.addEventListener("submit", createUpdateFormListener);
  form.addEventListener("input", updatePreview);

  if (id) {
    H1.innerText = "Update Listing";
    try {
      const listingData = await getAListings(id);
      fillUpdateListingDetails(listingData);
      form.endingAt.setAttribute("disabled", "");
      updatePreview(listingData.media);
    } catch (error) {
      console.log(error);
      const errorContainer = document.querySelector(
        "#error-reporting-container"
      );
      errorContainer.innerHTML = `<p class="p-3 text-losing bg-secondary"> An error occurred please refresh and try again. If problems persist, check the listing still exists.</p>`;
      location.hash = "#error-reporting-container";
    }
  }
};

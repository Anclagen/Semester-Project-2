import { getAListings } from "../api/listing/getAListing.js";
import { createUpdateFormListener } from "../listeners/listing/createUpdate.js";
import { removeMediaInput } from "../listeners/removeMediaInputs.js";
import { addMoreMedia } from "../listeners/showMoreMediaInputs.js";

export const createUpdatePageSetup = async function () {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  let id = params.get("id");
  if (id) {
    try {
      const listingData = await getAListings(id);
      console.log(listingData);
    } catch (error) {
      console.log(error);
    }
  }

  const form = document.querySelector("#create-form");
  form.addEventListener("submit", createUpdateFormListener);

  const addMoreMediaBtn = document.querySelector("#add-more-media-btn");
  addMoreMediaBtn.addEventListener("click", addMoreMedia);

  const removeMediaBtn = document.querySelector("#remove-media-btn");
  removeMediaBtn.addEventListener("click", removeMediaInput);
};

import { deleteListingListener } from "../../listeners/listing/deleteListing.js";
import { getParamURL } from "../../tools/getParamsURL.js";

/**
 * Adds delete and update buttons on specific listing page.
 */
export const addListingOptions = function () {
  const id = getParamURL("id");
  const listingOptionsContainer = document.querySelector("#edit-delete-btns");
  listingOptionsContainer.innerHTML = `<button id="delete-listing-btn" data-isLoggedVisibility="true" type="button" class="btn btn-danger my-3">Delete Listing</button>
                                  <a id="edit-listing-btn" data-isLoggedVisibility="true" href="create.html?id=${id}" class="btn btn-primary my-3">Edit Listing</a>`;

  const deleteButton = document.querySelector("#delete-listing-btn");
  deleteButton.addEventListener("click", deleteListingListener);
};

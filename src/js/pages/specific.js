import { getAListings } from "../api/listing/getAListing.js";
import { deleteListingListener } from "../listeners/listing/deleteListing.js";
import { placeBidFormListener } from "../listeners/listing/placeBid.js";
import { updateSpecificPostDetails } from "../render/updateSpecificDetails.js";
import { storage } from "../storage/storage.js";

export const specificPageSetup = async function () {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  let id = params.get("id");
  if (id) {
    try {
      const listingData = await getAListings(id);
      console.log(listingData);
      //create profile check function to set max bid.
      updateSpecificPostDetails(listingData, 1000);

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

        const deleteButton = document.querySelector("#delete-listing-btn");
        deleteButton.addEventListener("click", deleteListingListener);

        const updateButton = document.querySelector("#edit-listing-btn");
        updateButton.href = `create.html?id=${listingData.id}`;
      }
    } catch (error) {
      console.log(error);
    }
  }
};

import { getAllListings } from "../api/listing/getAllListings.js";
import { skeletonLoaderListingCards } from "../render/loader.js";
import { renderActiveListings } from "../tools/renderActiveListing.js";
import { getParamURL } from "../tools/getParamsURL.js";
import { searchListings } from "./search.js";
import { sortListings } from "./sort.js";
import { addListingPageControls } from "../listeners/addListingPageControls.js";
import { updateListingPageDetails } from "../render/updateListingPageDetails.js";

let listings = [];
let sortedActiveListings = [];
let filteredListings = [];

/**
 * Fetches depending sort/search query and generates content for page
 * @param {Number} page current page number
 * @param {Number} numberPages Total pages, is updated as more fetches are performed
 * @param {Number} offset offset to get more results from api as needed
 */
export const showSortedListings = async function (
  page,
  numberPages,
  offset = 0
) {
  try {
    const inputs = document.querySelectorAll("input[type=radio]");
    const listingsContainer = document.querySelector("#listing-results");
    listingsContainer.innerHTML = "";
    skeletonLoaderListingCards(listingsContainer);

    // filter results for search if querystring present
    const search = getParamURL("search");
    if (search !== null) {
      if (page === 1) {
        listings = [
          ...(await getAllListings()),
          ...(await getAllListings("created", "desc", 100)),
        ];
        filteredListings = searchListings([...listings]);
        sortedActiveListings = sortListings(filteredListings);
        numberPages = Math.ceil(filteredListings.length / 20);
      }
    } else if (inputs[2].checked) {
      //checks if popular radio option checked fetches listings based on that.
      if (page === 1) {
        listings = [
          ...(await getAllListings()),
          ...(await getAllListings("created", "desc", 100)),
        ];
      }
      sortedActiveListings = sortListings(listings);
    } else if (inputs[1].checked) {
      //checks if ending soon radio option checked fetches listings based on that.
      if (page === 1) {
        listings = await getAllListings("endsAt", "asc");
      }

      if (page === numberPages - 1 && listings.length % 100 === 0) {
        offset += 100;
        listings = [
          ...listings,
          ...(await getAllListings("endsAt", "asc", offset)),
        ];

        numberPages = Math.ceil(listings.length / 20);
      }
      sortedActiveListings = listings;
    } else if (inputs[0].checked) {
      //checks if newest radio option checked fetches listings based on that.
      if (page === 1) {
        listings = await getAllListings("created", "desc", offset);
      }
      if (page === numberPages - 1 && listings.length % 100 === 0) {
        offset += 100;
        listings = [
          ...listings,
          ...(await getAllListings("created", "desc", offset)),
        ];
        numberPages = Math.ceil(listings.length / 20);
      }
      sortedActiveListings = listings;
    }

    listingsContainer.innerHTML = "";
    renderActiveListings(
      listingsContainer,
      [...sortedActiveListings].slice((page - 1) * 20),
      20
    );

    if (page === 1 && search === null) {
      numberPages = Math.ceil(listings.length / 20);
    }

    if (sortedActiveListings.length === 0 && listings.length === 0) {
      listingsContainer.innerHTML = `<div class="bg-secondary text-center p-3 mt-2">
                                        <p>No listings found.</p>
                                    <div>`;
    }

    updateListingPageDetails();
    addListingPageControls(page, numberPages, offset, listings);
  } catch (error) {
    console.log(error);
    const listingsContainer = document.querySelector("#listing-results");
    listingsContainer.innerHTML = `<div class="text-danger text-center py-3">
                                      <p>Oops!?, an error occurred. Please refresh the page and try again. </p>
                                    <div>`;
  }
};

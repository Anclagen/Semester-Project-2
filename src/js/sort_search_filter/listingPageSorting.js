import { getAllListings } from "../api/listing/getAllListings.js";
import { skeletonLoaderListingCards } from "../render/loader.js";
import { renderActiveListings } from "../render/renderActiveListing.js";
import { getParamURL } from "../tools/getParamsURL.js";
import { searchListings } from "./search.js";
import { sortListings } from "./sort.js";
import { addListingPageControls } from "../listeners/addListingPageControls.js";
import { updateListingPageDetails } from "../render/listings/updateListingPageDetails.js";
import { generateErrorMessage } from "../render/errorMessages.js";

let listings = [];
let sortedActiveListings = [];

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
  const listingsContainer = document.querySelector("#listing-results");
  const inputs = document.querySelectorAll("input[type=radio]");

  try {
    //clears old results and adds loading
    listingsContainer.innerHTML = "";
    skeletonLoaderListingCards(listingsContainer);

    // filter results for search if querystring present, checks for updated
    let search = getParamURL("search");
    const listingPageSearch = document.querySelector("#listing-search");
    if (listingPageSearch) {
      search = listingPageSearch.value;
    }

    //sorting out the fetches, based on search and checked radio button
    if (search !== null) {
      if (page === 1 && !listingPageSearch) {
        listings = [
          ...(await getAllListings()),
          ...(await getAllListings("created", "desc", 100)),
        ];
      }
      const filteredListings = searchListings([...listings]);
      sortedActiveListings = sortListings(filteredListings);
    } else if (inputs[2].checked) {
      //checks if popular radio option checked fetches listings based on that.
      if (page === 1 && listings.length === 0) {
        listings = [
          ...(await getAllListings()),
          ...(await getAllListings("created", "desc", 100)),
        ];
      }
      sortedActiveListings = sortListings(listings);
    } else if (inputs[1].checked) {
      // popular radio option; ending soon
      listings = sortedActiveListings = await fetchMoreResult(
        page,
        numberPages,
        listings,
        offset,
        "endsAt",
        "asc"
      );
    } else if (inputs[0].checked) {
      // popular radio option; newest
      listings = sortedActiveListings = await fetchMoreResult(
        page,
        numberPages,
        listings,
        offset,
        "created",
        "desc"
      );
    }

    // updating page number as more fetches are done this updates.
    numberPages = Math.ceil(sortedActiveListings.length / 20);

    // clear and fill container for relevant listings.
    listingsContainer.innerHTML = "";
    renderActiveListings(
      listingsContainer,
      [...sortedActiveListings].slice((page - 1) * 20),
      20
    );
    // if no results display message
    if (sortedActiveListings.length === 0) {
      listingsContainer.innerHTML = `<div class="bg-secondary text-center p-3 mt-3">
                                        <p class="m-0">No listings found.</p>
                                    <div>`;
    }

    //updates the page.
    updateListingPageDetails(page, numberPages, offset);
    addListingPageControls(page, numberPages, offset);
  } catch (error) {
    console.log(error);
    listingsContainer.classList.add("text-center");
    if (error.toString().includes("Too Many Requests")) {
      generateErrorMessage(
        listingsContainer,
        "Too many requests, wait 1 minute and refresh the page."
      );
    } else {
      generateErrorMessage(
        listingsContainer,
        `An error occurred please refresh and try again. (${error})`
      );
    }
  }
};

/**
 * Checks if more listings are needed and fetched them.
 * @param {Number} page current page
 * @param {Number} numberPages total pages so far
 * @param {Array} listings current array of listings
 * @param {Number} offset current offset
 * @param {String} sort how listings are to be sorted
 * @param {String} order asc or desc
 * @returns {Promise<Array>} returns updated listings
 */
const fetchMoreResult = async function (
  page,
  numberPages,
  listings,
  offset,
  sort,
  order
) {
  if (page === 1) {
    listings = await getAllListings(sort, order);
  }

  if (page === numberPages - 1 && listings.length % 100 === 0) {
    offset += 100;
    listings = [...listings, ...(await getAllListings(sort, order, offset))];
  }

  return listings;
};

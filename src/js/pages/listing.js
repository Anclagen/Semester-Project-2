import { getAllListings } from "../api/listing/getAllListings.js";
import { addLoader } from "../render/loader.js";
import { filterActiveListings } from "../sort_search_filter/filterActiveListing.js";
import { renderActiveListings } from "../tools/renderActiveListing.js";

export const listingPageSetup = async function () {
  const listingsContainer = document.querySelector("#listing-results");
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  let search = params.get("search");

  const sort = params.get("sort");
  console.log(sort);

  const inputs = document.querySelectorAll("input[type=radio]");
  if (sort === null || sort === "newest") {
    inputs[0].checked = true;
  } else if (sort === "ends-soon") {
    inputs[1].checked = true;
  } else if (sort === "popular") {
    inputs[2].checked = true;
  }

  const showSortedListings = function () {
    const checked = document.querySelector("input[type=radio]:checked").value;
    listingsContainer.innerHTML = "";
    if (checked === "newest") {
      inputs[0].checked = true;
      renderActiveListings(listingsContainer, filteredListings, 40);
    } else if (checked === "ends-soon") {
      filteredListings.sort((a, b) => new Date(a.endsAt) - new Date(b.endsAt));
      renderActiveListings(listingsContainer, listings, 40);
      inputs[1].checked = true;
    } else if (checked === "popular") {
      inputs[2].checked = true;
      const popular = filteredListings.sort(
        (a, b) => b.bids.length - a.bids.length
      );
      renderActiveListings(listingsContainer, popular, 40);
    }
  };

  const searchListings = function () {
    console.log(search);
    const searchTerm = search.toLowerCase();
    const filteredListings = activeListing.filter((listing) => {
      const seller = listing.seller.name.toLowerCase();
      const title = listing.title.toLowerCase();
      const body =
        listing.description === null ? "" : listing.description.toLowerCase();
      const tags = listing.tags.map((tag) => {
        return tag.toLowerCase();
      });

      if (seller.startsWith(searchTerm)) {
        return true;
      } else if (title.indexOf(searchTerm) >= 0) {
        return true;
      } else if (body.indexOf(searchTerm) >= 0) {
        return true;
      } else {
        let isTag = false;
        tags.forEach((tag) => {
          if (tag.startsWith(searchTerm)) {
            isTag = true;
          }
        });
        return isTag;
      }
    });

    return filteredListings;
  };

  addLoader(listingsContainer);
  let listings = [];
  let activeListing = [];
  let filteredListings = [];

  try {
    listings = await getAllListings();
    activeListing = filterActiveListings(listings);
    if (search !== null) {
      filteredListings = searchListings();
    } else {
      filteredListings = activeListing;
    }
    showSortedListings();
  } catch (error) {
    console.log(error);
    listingsContainer.innerHTML = `<div class="text-danger text-center py-3">
                                      <p>Oops!?, an error occurred. Please refresh the page and try again. </p>
                                    <div>`;
  }

  const fieldset = document.querySelector("fieldset");
  fieldset.addEventListener("change", showSortedListings);
};

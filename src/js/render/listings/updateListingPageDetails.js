import { showSortedListings } from "../../sort_search_filter/listingPageSorting.js";
import { debounce } from "../../tools/debounce.js";
import { getParamURL } from "../../tools/getParamsURL.js";

/**
 * Updates the listing pages details, adds live search bar when search query present.
 * @param {Number} page current page number
 * @param {Number} numberPages Total pages(so far)
 * @param {Number} offset offset for the API call
 */
export const updateListingPageDetails = function (page, numberPages, offset) {
  let search = getParamURL("search");
  const inputs = document.querySelectorAll("input[type=radio]");
  const searchDetailsContainer = document.querySelector(
    "#search-results-details"
  );
  const h1 = document.querySelector("h1");
  const title = document.querySelector("title");

  //update page title
  if (inputs[0].checked) {
    h1.innerText = search ? "Searching By Newest" : "Newest Listings";
  } else if (inputs[1].checked) {
    h1.innerText = search ? "Searching By Ending Soon" : "Listings Ending Soon";
  } else if (inputs[2].checked) {
    h1.innerText = search ? "Searching By Popular" : "Popular Listings";
  }

  //if the search bar isn't present it creates one and fills with the current search query
  let listingPageSearch = document.querySelector("#listing-search");
  if (search && !listingPageSearch) {
    searchDetailsContainer.innerHTML = `<div class="bg-background-secondary section-box-shadow p-3 rounded-3">
                                          <form class="d-block w-100" role="search" id="listing-search-form">
                                            <div class="w-75 mx-auto">
                                              <label for="listing-search" class="form-label">Searching for;</label> 
                                              <input class="form-control rounded " id="listing-search" type="search" name="search" value=${search} aria-label="Search">                                            
                                            </div>
                                          </form>
                                          <div class="text-center">
                                            <a href="./listings.html">View All Listings</a>
                                          </div>
                                        </div>`;

    //added listener for search bar
    listingPageSearch = document.querySelector("#listing-search");
    listingPageSearch.addEventListener(
      "input",
      debounce(function () {
        page = 1;
        showSortedListings(page, numberPages, offset);
      }, 500)
    );
    //prevents hitting enter refreshing the page.
    const searchForm = document.querySelector("#listing-search-form");
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  } else if (listingPageSearch) {
    //update search value for page title
    search = listingPageSearch.value;
  }

  if (search) {
    title.innerText = `Searching for: ${search} | Forgotten Treasures`;
  }
};

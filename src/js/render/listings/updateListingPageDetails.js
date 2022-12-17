import { getParamURL } from "../../tools/getParamsURL.js";

/**
 * Updates titles/headings based on selected filters
 */
export const updateListingPageDetails = function () {
  let search = getParamURL("search");
  const inputs = document.querySelectorAll("input[type=radio]");
  const searchDetailsContainer = document.querySelector(
    "#search-results-details"
  );
  const h1 = document.querySelector("h1");
  const title = document.querySelector("title");

  if (inputs[0].checked) {
    h1.innerText = "Newest Listings";
  } else if (inputs[1].checked) {
    h1.innerText = "Listings Ending Soon";
  } else if (inputs[2].checked) {
    h1.innerText = "Popular Listings";
  }

  if (search !== null) {
    searchDetailsContainer.innerHTML = `<div class="text-center py-2 bg-secondary">
    <p class="m-0">Searching for: ${search} </p><a href="./listings.html">Clear search</a>
  <div>`;
    title.innerText = `Searching for: ${search} | Forgotten Treasures`;
  }
};

import { getParamURL } from "../tools/getParamsURL.js";
import { showSortedListings } from "../sort_search_filter/listingPageSorting.js";

/**
 * Listings page setup function
 */
export const listingPageSetup = async function () {
  let sort = getParamURL("sort");
  const inputs = document.querySelectorAll("input[type=radio]");
  if (sort === null || sort === "newest") {
    inputs[0].checked = true;
  } else if (sort === "ends-soon") {
    inputs[1].checked = true;
  } else if (sort === "popular") {
    inputs[2].checked = true;
  }

  //pagination variables
  let page = 1;
  let numberPages = 0;
  let offset = 0;

  await showSortedListings(page, numberPages, offset);
  // radio button field set listener to change sorting.
  const fieldset = document.querySelector("fieldset");

  fieldset.addEventListener("change", () => {
    page = 1;
    showSortedListings(page, numberPages, offset);
  });
};

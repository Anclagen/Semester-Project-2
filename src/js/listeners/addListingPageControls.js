import { showSortedListings } from "../sort_search_filter/listingPageSorting.js";

/**
 * Generates pagination controls for listing page
 * @param {Number} page current page number
 * @param {Number} numberPages Total pages, is updated as more fetches are performed
 * @param {Number} offset offset to get more results from api as needed
 * @param {Array} listings Array of total listings fetch so far.
 */
export const addListingPageControls = async function (
  page,
  numberPages,
  offset,
  listings
) {
  const pageControlContainer = document.querySelector("#listing-page-controls");
  pageControlContainer.innerHTML = `<button type="button" class="col btn btn-primary m-2" id="previous-btn" ${
    page === 1 ? "disabled" : ""
  }>Previous</button>
                                    <div class="py-2 m-2 col col-lg-8">Page ${page} of ${
    listings.length % 100 === 0 ? numberPages + "+" : numberPages
  }</div>
                                    <button type="button" class="btn btn-primary m-2 col" id="next-btn" ${
                                      page === numberPages ? "disabled" : ""
                                    }>Next</button>`;

  const previousBtn = document.querySelector("#previous-btn");
  const nextBtn = document.querySelector("#next-btn");

  nextBtn.addEventListener("click", async () => {
    page++;
    showSortedListings(page, numberPages, offset);
  });

  previousBtn.addEventListener("click", async () => {
    page--;
    showSortedListings(page, numberPages, offset, offset);
  });
};

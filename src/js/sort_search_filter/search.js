import { getParamURL } from "../tools/getParamsURL.js";

/**
 * Searched through an array for listings matching the search terms
 * @param {Array} activeListing Array of listings
 * @returns {Array} returns an array with matching listings.
 */
export function searchListings(activeListing) {
  const search = getParamURL("search");

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
}

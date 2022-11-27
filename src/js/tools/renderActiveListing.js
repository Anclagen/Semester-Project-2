import { createListingCard } from "../render/listingCard.js";

/**
 * Fills a container with desired amount of active listings.
 * @param {Element} container
 * @param {Array} listings
 * @param {Number} displayAmount
 */
export const renderActiveListings = function (
  container,
  listings,
  displayAmount
) {
  for (let i = 0; 0 < displayAmount; i++) {
    const timeLeft = new Date(listings[i].endsAt) - new Date();

    if (timeLeft > 0) {
      displayAmount--;
      container.append(createListingCard(listings[i]));
    }
  }
};

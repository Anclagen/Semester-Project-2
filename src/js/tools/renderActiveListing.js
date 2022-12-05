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
  if (displayAmount > listings.length) {
    displayAmount = listings.length;
  }

  for (let i = 0; i < displayAmount; i++) {
    const timeLeft = new Date(listings[i].endsAt) - new Date();
    if (timeLeft > 0) {
      container.append(createListingCard(listings[i]));
    }
  }
};

import { createListingCard } from "../listingCard.js";

/**
 * Function to take listing data on the profile page and fill Most recent and all sections.
 * @param {Array} data Listing data
 * @param {Element} recent most recent listings container, puts 3 on page
 * @param {Element} all All listing container, places all in container.
 * @param {String} message Message for no listings.
 */
export const recentProfileCardsSetup = function (
  data,
  recent,
  all,
  message = "No listings yet."
) {
  if (data.length > 0) {
    all.innerHTML = "";
    recent.innerHTML = "";
    data.forEach((listing, index) => {
      if (index < 3) {
        const card = createListingCard(listing);
        card.classList = `p-2 p-xl-3 col-lg-6 col-xl-4 listing-card ${
          index > 0 ? "d-none d-xl-flex" : ""
        } ${index === 1 ? "d-lg-flex" : ""}`;
        recent.append(card);
      }
      all.append(createListingCard(listing));
    });
  } else {
    all.innerHTML = ` <p class="ps-4 py-4">${message}</p>`;
    recent.innerHTML = ` <p class="ps-4 py-4">${message}</p>`;
  }
};

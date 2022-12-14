import { createListingCard } from "../render/listingCard.js";

export const recentProfileCardsSetup = function (
  data,
  recent,
  all,
  message = "No listings yet."
) {
  if (data.length > 0) {
    all.innerHTML = "";
    recent.innerHTML = "";
    data.map((listing) => {
      all.append(createListingCard(listing));
    });

    data.forEach((listing, index) => {
      if (index < 3) {
        const card = createListingCard(listing);
        card.classList = `p-2 p-xl-3 col-lg-6 col-xl-4 listing-card ${
          index > 0 ? "d-none d-xl-flex" : ""
        } ${index === 1 ? "d-lg-flex" : ""}`;
        recent.append(card);
      }
    });
  } else {
    all.innerHTML = ` <p class="ps-4 py-4">${message}</p>`;
    recent.innerHTML = ` <p class="ps-4 py-4">${message}</p>`;
  }
};

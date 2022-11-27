import { getAllListings } from "../api/listing/getAllListings.js";
import { renderActiveListings } from "../tools/renderActiveListing.js";

export const homeSetup = async function () {
  let offset = 0;

  const newestContainer = document.querySelector("#newest");
  const newestListings = await getAllListings();
  renderActiveListings(newestContainer, newestListings, 8);

  const popularContainer = document.querySelector("#hot-stuff");
  const popular = newestListings.sort((a, b) => b.bids.length - a.bids.length);
  renderActiveListings(popularContainer, popular, 8);

  const endingSoonContainer = document.querySelector("#ending-soon");
  const endingSoonListings = await getAllListings("endsAt", "asc", offset);
  renderActiveListings(endingSoonContainer, endingSoonListings, 8);
};

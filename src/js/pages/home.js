import { getAllListings } from "../api/listing/getAllListings.js";
import { addLoader } from "../render/loader.js";
import { renderActiveListings } from "../tools/renderActiveListing.js";

export const homeSetup = async function () {
  let offset = 0;

  const newestContainer = document.querySelector("#newest");
  addLoader(newestContainer);
  const newestListings = await getAllListings();
  newestContainer.innerHTML = "";
  renderActiveListings(newestContainer, newestListings, 8);

  const popularContainer = document.querySelector("#hot-stuff");
  addLoader(popularContainer);
  const popular = newestListings.sort((a, b) => b.bids.length - a.bids.length);
  popularContainer.innerHTML = "";
  renderActiveListings(popularContainer, popular, 8);

  const endingSoonContainer = document.querySelector("#ending-soon");
  addLoader(endingSoonContainer);
  const endingSoonListings = await getAllListings("endsAt", "asc", offset);
  endingSoonContainer.innerHTML = "";
  renderActiveListings(endingSoonContainer, endingSoonListings, 8);
};

import { getAllListings } from "../api/listing/getAllListings.js";
import { generateErrorMessage } from "../render/errorMessages.js";
import { setupListingSlider } from "../tools/listingSlider.js";
/**
 * Sets up home page sliders
 */
export const homeSetup = async function () {
  const endingSoonContainer = document.querySelector("#ending-soon-slider");
  const popularContainer = document.querySelector("#popular-slider");
  const newestContainer = document.querySelector("#newest-slider");

  try {
    const endingSoonListings = await getAllListings("endsAt", "asc");
    setupListingSlider(endingSoonListings, endingSoonContainer);

    const popular = endingSoonListings.sort(
      (a, b) => b.bids.length - a.bids.length
    );
    setupListingSlider(popular, popularContainer);

    const newestListings = await getAllListings();
    setupListingSlider(newestListings, newestContainer);
  } catch (error) {
    if (error.toString().includes("Too Many Requests")) {
      generateErrorMessage(
        endingSoonContainer,
        "Too many requests, wait 1 minute and refresh the page."
      );
    } else {
      generateErrorMessage(
        endingSoonContainer,
        "An error occurred please refresh and try again. If problems persist, contact the administrator."
      );
    }
  }
};

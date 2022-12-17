import { placeABid } from "../../api/listing/placeBid.js";
import { generateErrorMessage } from "../../render/errorMessages.js";
import { getParamURL } from "../../tools/getParamsURL.js";

/**
 * places a bid on a listing on the specific page.
 * @param {Submit} event bidding form submission
 */
export const placeBidFormListener = async function (event) {
  try {
    event.preventDefault();
    let id = getParamURL("id");
    await placeABid(id, Number(event.target.amount.value));
    location.reload();
  } catch (error) {
    const errorContainer = document.querySelector("#bid-error-reporting");
    const stringError = error.toString();
    if (stringError.includes("Your bid must be higher than the current bid")) {
      //I could refresh for them I guess
      generateErrorMessage(
        errorContainer,
        "Your bid must be higher than the current bid, please refresh the page to update the listing."
      );
    } else if (stringError.includes("No listing with such ID")) {
      generateErrorMessage(
        errorContainer,
        "This listing no longer exists, the seller has removed it."
      );
    } else {
      generateErrorMessage(errorContainer, error);
    }
  }
};

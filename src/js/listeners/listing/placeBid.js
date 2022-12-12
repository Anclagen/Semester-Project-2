import { placeABid } from "../../api/listing/placeBid.js";
import { getParamURL } from "../../tools/getParamsURL.js";

export const placeBidFormListener = async function (event) {
  try {
    event.preventDefault();
    let id = getParamURL("id");
    await placeABid(id, Number(event.target.amount.value));
    location.reload();
  } catch (error) {
    console.log(error);
    const errorContainer = document.querySelector("#error-reporting-container");
    errorContainer.innerHTML = `<p class="p-3 text-losing bg-secondary">An error occurred. Listing may have finished or no longer exists. </p>`;
    location.hash = "#error-reporting-container";
  }
};

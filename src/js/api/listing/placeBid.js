import { baseURL } from "../constants.js";
import { createAuthHeader } from "../authHeader.js";

/**
 * Place bid on listing
 * @param {String} id the posts id
 * @param {Number} amount the bidding amount
 * @returns {Promise<Array>} Response array of listing objects.
 */
export async function placeABid(id, amount) {
  const url = `${baseURL}listings/${id}/bids`;

  const requestOptions = {
    method: "POST",
    headers: createAuthHeader(),
    body: JSON.stringify({ amount: amount }),
  };

  const response = await fetch(url, requestOptions);
  if (response.ok) {
    return await response.json();
  }

  const json = await response.json();
  if (json.errors[0].message) {
    throw new Error(json.errors[0].message);
  }

  throw new Error(response.statusText);
}

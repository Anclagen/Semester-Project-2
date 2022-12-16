import { baseURL } from "../constants.js";
import { myHeader } from "../header.js";

/**
 * Get a listings
 * @param {string} id the posts id
 * @returns {Promise<Array>} Response array of listing objects.
 */
export async function getAListings(id) {
  const url = `${baseURL}listings/${id}?_seller=true&_bids=true`;

  const requestOptions = {
    method: "GET",
    headers: myHeader,
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

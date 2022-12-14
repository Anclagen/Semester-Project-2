import { baseURL } from "../constants.js";
import { myHeader } from "../header.js";

/**
 * Get all active listings
 * @param {String} sort id/title/description/tags, default set to created
 * @param {String} order desc or asc, default set to desc
 * @param {Number} offset use 100 to get page 2 of results, default set to 0
 * @returns {Promise<Array>} Response array of listing objects.
 */
export async function getAllListings(
  sort = "created",
  order = "desc",
  offset = 0,
  limit = 100
) {
  const url = `${baseURL}listings?_seller=true&_bids=true&sort=${sort}&sortOrder=${order}&offset=${offset}&limit=${limit}&_active=true`;
  const requestOptions = {
    method: "GET",
    headers: myHeader,
  };

  const response = await fetch(url, requestOptions);
  const json = await response.json();

  if (response.ok) {
    return json;
  }

  throw new Error(response.statusText);
}

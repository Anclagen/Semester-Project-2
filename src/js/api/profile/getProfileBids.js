import { baseURL } from "../constants.js";
import { createAuthHeader } from "../authHeader.js";

/**
 * Gets a users profiles listings
 * @param {String} username name of profile
 * @returns {Object} with users profile data
 */
export async function getUserProfileBids(username) {
  const url = `${baseURL}profiles/${username}/bids?_listings=true&_seller=true&_bids=true&_active=true`;

  const myHeaders = createAuthHeader();

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  const response = await fetch(url, requestOptions);
  if (response.ok) {
    return await response.json();
  }
  const json = await response.json();
  console.log(json);
  if (json.errors[0].message) {
    throw new Error(json.errors[0].message);
  }

  throw new Error(response.statusText);
}

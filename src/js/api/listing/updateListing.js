import { baseURL } from "../constants.js";
import { createAuthHeader } from "../authHeader.js";

/**
 * Updates a specific listing.
 * @param {Object} bodyData title, description, [tags], [media], endsAt (Instance of new Date())
 * @param {String} id Listings ID
 * @returns {Promise<Object>} returns an object with the listing details
 */
export const updateListing = async function (bodyData, id) {
  const url = `${baseURL}listings/${id}`;

  let myHeaders = createAuthHeader();

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(bodyData),
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
};

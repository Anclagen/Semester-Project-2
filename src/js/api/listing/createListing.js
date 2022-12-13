import { baseURL } from "../constants.js";
import { createAuthHeader } from "../authHeader.js";

/**
 * Creates a new listing
 * @param {Object} bodyData title, description, [tags], [media], endsAt (Instance of new Date())
 * @returns {Promise<Object>} returns and object with the listing details
 */
export const createListing = async function (bodyData) {
  const url = `${baseURL}listings`;

  let myHeaders = createAuthHeader();

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(bodyData),
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
};

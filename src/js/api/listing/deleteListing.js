import { baseURL } from "../constants.js";
import { createAuthHeader } from "../authHeader.js";

/**
 * Deletes a listing
 * @param {String} id Listings id
 * @returns {Boolean} returns true or throws error
 */
export const deleteListing = async function (id) {
  const url = `${baseURL}listings/${id}`;

  let myHeaders = createAuthHeader();

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
  };

  const response = await fetch(url, requestOptions);

  if (response.ok) {
    return true;
  }

  const json = await response.json();
  if (json.errors[0].message) {
    throw new Error(json.errors[0].message);
  }

  throw new Error(response.statusText);
};

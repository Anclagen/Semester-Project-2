import { baseURL } from "../constants.js";
import { createAuthHeader } from "../authHeader.js";

/**
 * Deletes a listing
 * @param {String} id Listings id
 * @returns
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

  throw new Error(response);
};

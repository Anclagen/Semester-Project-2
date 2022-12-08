import { baseURL } from "../constants.js";
import { createAuthHeader } from "../authHeader.js";

/**
 * Gets a users profile data
 * @param {String} username name of profile
 * @returns {Object} with users profile data
 */
export async function getUserProfile(username) {
  const url = `${baseURL}profiles/${username}?_listings=true`;

  const myHeaders = createAuthHeader();

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  const response = await fetch(url, requestOptions);
  if (response.ok) {
    return await response.json();
  }

  throw new Error(response);
}

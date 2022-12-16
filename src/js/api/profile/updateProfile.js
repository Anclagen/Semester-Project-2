import { baseURL } from "../constants.js";
import { createAuthHeader } from "../authHeader.js";
import { storage } from "../../storage/storage.js";

/**
 *  Updates avatar url for user
 * @param {Object} media {avatar: "url.com/abc.jpg"}
 * @returns {Object} profile object
 */
export async function updateAvatar(media) {
  const profile = storage.get("profile");
  const username = profile.name;

  const url = `${baseURL}profiles/${username}/media`;
  const myHeaders = createAuthHeader();

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(media),
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

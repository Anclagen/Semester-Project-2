import { baseURL } from "../constants.js";
import { createAuthHeader } from "../authHeader.js";

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

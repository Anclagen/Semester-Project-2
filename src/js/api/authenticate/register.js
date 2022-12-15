import { baseURL } from "../constants.js";

/**
 * Register a new user
 * @param {Object} bodyData {name, email, password, avatar}
 * @returns {Promise<Object>} response object
 */
export async function register(bodyData) {
  const url = `${baseURL}auth/register`;

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

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

  // throws error message if present or statusText
  if (json.errors[0].message) {
    throw json.errors[0].message;
  }

  throw response.statusText;
}

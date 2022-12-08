import { baseURL } from "../constants.js";

/**
 * login a user
 * @param {Object} bodyData {email, password}
 * @returns {Promise<Object>} response object
 */
export async function login(bodyData) {
  const url = `${baseURL}auth/login`;

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

  throw new Error(response);
}

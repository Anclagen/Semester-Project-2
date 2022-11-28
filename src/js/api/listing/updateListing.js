import { baseURL } from "../constants.js";
import { createAuthHeader } from "../authHeader.js";

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

  throw new Error(response);
};

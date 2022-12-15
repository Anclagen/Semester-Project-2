import { storage } from "../storage/storage.js";

/**
 * Returns headers with authorization included
 * @returns new Headers() class
 */
export function createAuthHeader() {
  const token = storage.get("token");
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  return myHeaders;
}

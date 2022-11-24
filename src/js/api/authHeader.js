import { storage } from "../storage/storage.js";

export function createAuthHeader() {
  const token = storage.get("token");
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  return myHeaders;
}

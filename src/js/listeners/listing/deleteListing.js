import { deleteListing } from "../../api/listing/deleteListing.js";

export const deleteListingListener = async function () {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  let id = params.get("id");
  await deleteListing(id);
};

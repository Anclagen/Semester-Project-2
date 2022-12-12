import { deleteListing } from "../../api/listing/deleteListing.js";

export const deleteListingListener = async function () {
  try {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    let id = params.get("id");
    const response = await deleteListing(id);
    if (response === true) {
      location.href = "./profile.html?deleted=true";
    }
  } catch (error) {
    console.log(error);
    const errorContainer = document.querySelector("#error-reporting-container");
    errorContainer.innerHTML = `<p class="p-3 text-losing bg-secondary">An error occurred please refresh and try again.</br> Listing might no longer exists. </p>`;
    location.hash = "#error-reporting-container";
  }
};

import { createListing } from "../../api/listing/createListing.js";
import { updateListing } from "../../api/listing/updateListing.js";

export const createUpdateFormListener = async function (event) {
  event.preventDefault();

  const mediaInputs = Array.from(
    event.target.querySelectorAll("input[type=url]:enabled")
  );

  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  let id = params.get("id");

  const bodyData = {
    title: event.target.title.value,
    description: event.target.description.value,
    tags: event.target.tags.value
      .split(",")
      .map((tag) => tag.trim())
      .slice(0, 8),
    media: mediaInputs
      .map((input) => input.value)
      .filter((value) => value !== ""),
    endsAt: new Date(event.target.endingAt.value),
  };

  try {
    let response = {};

    if (id === null) {
      response = await createListing(bodyData);
    } else {
      response = await updateListing(bodyData, id);
    }

    window.location.href = `./specific.html?id=${response.id}`;
  } catch (error) {
    console.log(error);
    const errorContainer = document.querySelector("#error-reporting-container");
    errorContainer.innerHTML = `<p class="p-3 text-losing bg-secondary"> An error occurred please refresh and try again </p>`;
    location.hash = "#error-reporting-container";
  }
};

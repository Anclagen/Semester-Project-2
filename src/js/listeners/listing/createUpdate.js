import { createListing } from "../../api/listing/createListing.js";
//import { deleteListing } from "../../api/listing/deleteListing.js";
import { updateListing } from "../../api/listing/updateListing.js";

export const createUpdateFormListener = async function (event) {
  event.preventDefault();

  const mediaInputs = Array.from(
    event.target.querySelectorAll("input[type=url]:enabled")
  );

  console.log(event.target.endingAt);
  const bodyData = {
    title: event.target.title.value,
    description: event.target.description.value,
    tags: event.target.tags.value
      .split(",")
      .map((tag) => tag.trim())
      .slice(0, 8),
    media: mediaInputs.map((input) => input.value),
    endsAt: new Date(event.target.endingAt.value),
  };
  console.log(bodyData);

  try {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    let id = params.get("id");
    let response = {};

    if (id === null) {
      response = await createListing(bodyData);
    } else {
      response = await updateListing(bodyData, id);
    }
    console.log(response);

    //const deleted = await deleteListing(response.id);
    //console.log(deleted);
  } catch (error) {
    console.log(error);
  }
};

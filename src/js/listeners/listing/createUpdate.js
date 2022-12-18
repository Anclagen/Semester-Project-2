import { createListing } from "../../api/listing/createListing.js";
import { updateListing } from "../../api/listing/updateListing.js";
import { generateErrorMessage } from "../../render/errorMessages.js";
import { getParamURL } from "../../tools/getParamsURL.js";
import { isFutureDate } from "../../tools/validation/validateDate.js";
import { validateTags } from "../../tools/validation/validateTags.js";

/**
 * Function for create/update form listener
 * @param {Submit} event submit event
 */
export const createUpdateFormListener = async function (event) {
  event.preventDefault();
  const errorContainer = document.querySelector("#error-reporting-container");
  const mediaErrorContainer = document.querySelector("#image-error");
  errorContainer.innerHTML = "";
  mediaErrorContainer.innerHTML = "";

  const mediaInputs = Array.from(
    event.target.querySelectorAll("input[type=url]:enabled")
  );
  let id = getParamURL("id");

  const bodyData = {
    title: event.target.title.value,
    description: event.target.description.value,
    tags: event.target.tags.value.split(",").map((tag) => tag.trim()),
    media: mediaInputs
      .map((input) => input.value)
      .filter((value) => value !== ""),
    endsAt: new Date(event.target.endingAt.value),
  };

  if (!validateTags(bodyData.tags, event.target.tags)) {
    return;
  }

  if (!isFutureDate(event.target.endingAt)) {
    return;
  }

  try {
    let response = {};
    if (id === null) {
      response = await createListing(bodyData);
    } else {
      response = await updateListing(bodyData, id);
    }

    window.location.href = `./specific.html?id=${response.id}`;
  } catch (error) {
    //check for image errors
    if (error.toString().includes("Image is not accessible")) {
      generateErrorMessage(mediaErrorContainer, error);
      mediaInputs.forEach((input) => {
        if (error.toString().includes(input.value)) {
          input.focus();
        }
      });
      // server errors usually
    } else if (error.toString().includes("Internal Server Error")) {
      generateErrorMessage(
        errorContainer,
        "Error, your login credentials may have expired, please logout and in again."
      );
      // Other errors returns the error as well in case it has useful additional info for user.
    } else {
      generateErrorMessage(
        errorContainer,
        `An unknown error occurred please refresh and try again. (${error})`
      );
    }
  }
};

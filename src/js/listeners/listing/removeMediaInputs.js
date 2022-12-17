import { showInputContainer } from "../../tools/inputAccordion.js";
import { updatePreview } from "../../render/createUpdate/updateListingPreview.js";

/**
 * Removed media inputs from the create form.
 * @param {CLick} event
 */
export const removeMediaInput = function (event) {
  const mediaInputContainer = document.querySelector("#media-inputs-container");
  const enabledMediaInputs = mediaInputContainer.querySelectorAll(
    "input[type=url]:enabled"
  );
  const addMoreMediaBtn = document.querySelector("#add-more-media-btn");

  if (enabledMediaInputs.length === 2) {
    event.target.classList.add("hidden");
  }
  addMoreMediaBtn.classList.remove("hidden");
  showInputContainer(enabledMediaInputs[enabledMediaInputs.length - 1]);

  updatePreview();
};

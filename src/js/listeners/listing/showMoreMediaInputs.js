import { showInputContainer } from "../../tools/inputAccordion.js";
import { updatePreview } from "../../render/createUpdate/updateListingPreview.js";

/**
 * Shows an extra media input field on create/update form
 * @param {Click} event
 */
export const addMoreMedia = function (event) {
  const mediaInputContainer = document.querySelector("#media-inputs-container");
  const disabledMediaInputs = mediaInputContainer.querySelectorAll(
    "input[type=url].hidden"
  );
  const removeMediaBtn = document.querySelector("#remove-media-btn");

  if (disabledMediaInputs.length === 1) {
    event.target.classList.add("hidden");
  }
  removeMediaBtn.classList.remove("hidden");

  showInputContainer(disabledMediaInputs[0]);
  updatePreview();
};

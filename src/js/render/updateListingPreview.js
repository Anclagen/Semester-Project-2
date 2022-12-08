import { renderImageSlider } from "./createImageSlider.js";

export const updatePreview = function (media = false) {
  const form = document.querySelector("#create-form");
  const title = document.querySelector("#preview-title");
  const description = document.querySelector("#preview-description");
  const tags = document.querySelector("#preview-tags");
  title.innerText = form.title.value;
  description.innerText = form.description.value;
  tags.innerText = form.tags.value;
  //media on listener will event change{..} so false doesn't come through
  if (media !== []) {
    const mediaInputs = Array.from(
      document.querySelectorAll("input[type=url]:enabled")
    );
    media = mediaInputs
      .map((input) => input.value)
      .filter((value) => value !== "");
  }
  renderImageSlider(media);
};

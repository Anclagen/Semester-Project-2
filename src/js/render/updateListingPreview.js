export const updatePreview = function () {
  const form = document.querySelector("#create-form");
  const mediaInputs = document.querySelectorAll("input[type=url]");
  const title = document.querySelector("#preview-title");
  const image = document.querySelector("#preview-image");
  const description = document.querySelector("#preview-description");
  const tags = document.querySelector("#preview-tags");

  title.innerText = form.title.value;
  image.src = mediaInputs[0].value;
  description.innerText = form.description.value;
  tags.innerText = form.tags.value;
};

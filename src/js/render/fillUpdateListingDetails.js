export const fillUpdateListingDetails = function ({
  title,
  description,
  tags,
  media,
  endsAt,
}) {
  const titleInput = document.querySelector("#form-title");
  titleInput.value = title;

  const descriptionInput = document.querySelector("#form-description");
  descriptionInput.value = description;

  const tagsInput = document.querySelector("#form-tags");
  tagsInput.value = tags.join(", ");

  const endingDateInput = document.querySelector("#form-ending-at");
  endingDateInput.value = endsAt;

  const mediaInputs = document.querySelectorAll("input[type=url]");
  media.forEach((url, i) => {
    mediaInputs[i].value = url;
    if (i > 0) {
      mediaInputs.classList.remove("hidden");
      mediaInputs.removeAttribute("disabled");
    }
  });
};

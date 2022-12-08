/**
 *
 * @param {Object} ListingData Listing data to update
 */
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
  const addMoreMediaBtn = document.querySelector("#add-more-media-btn");

  media.forEach((url, i) => {
    mediaInputs[i].value = url;
    if (i > 0) {
      //triggers add more event
      addMoreMediaBtn.click();
    }
  });

  const submitBtn = document.querySelector("#form-submit");
  submitBtn.innerHTML = "Update Listing";
};

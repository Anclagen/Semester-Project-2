export const validateTags = function (tagsArray, tagsInput) {
  const tagsErrorContainer = document.querySelector("#tags-error");
  if (tagsArray.length > 8) {
    tagsInput.focus();
    tagsErrorContainer.innerHTML = `<p class="text-danger">Too many tags added.</p>`;
    return false;
  }

  const tagsCharacterLimit = tagsArray.filter((tag) => tag.length > 24);
  if (tagsCharacterLimit.length > 0) {
    tagsInput.focus();
    tagsErrorContainer.innerHTML = `<p class="text-danger mt-0 pt-1">One or more tags are more than 24 characters.</p>`;
    return false;
  }

  tagsErrorContainer.innerHTML = "";
  return true;
};

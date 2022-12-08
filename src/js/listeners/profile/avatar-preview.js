export const setupAvatarPreview = function () {
  const input = document.querySelector("#avatar");
  const preview = document.querySelector("#avatar-preview");
  input.addEventListener("input", function () {
    preview.src = input.value;
  });
};

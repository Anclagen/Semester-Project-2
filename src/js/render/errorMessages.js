export const generateErrorMessage = function (container, message) {
  container.innerHTML = `<p class="p-3 text-losing bg-secondary">${message}</p>`;
};

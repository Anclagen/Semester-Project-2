/**
 * places an error message in specified container.
 * @param {Element} container
 * @param {String} message
 */
export const generateErrorMessage = function (container, message) {
  container.innerHTML = `<p class="p-3 text-losing bg-secondary">${message}</p>`;
};

export const rateLimitAlert = function (error) {
  if (error.toString().includes("Too Many Requests")) {
    alert("Too many requests, wait 1 minute and refresh the page.");
  }
};

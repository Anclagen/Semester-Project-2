/**
 * places an error message in specified container.
 * @param {Element} container
 * @param {String} message
 */
export const generateErrorMessage = function (container, message) {
  if (message.toString().includes("Too Many Requests")) {
    container.innerHTML = `<p class="p-3 text-losing bg-secondary">Too many requests, please wait 1 minute and try again.</p>`;
  } else {
    container.innerHTML = `<p class="p-3 text-losing bg-secondary">${message}</p>`;
  }
};

export const rateLimitAlert = function (error) {
  if (error.toString().includes("Too Many Requests")) {
    alert("Too many requests, wait 1 minute and refresh the page.");
  }
};

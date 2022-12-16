/**
 * Takes date inputs and checks date is a future date.
 * @param {Element} input Date input element
 * @returns {Boolean} true or false.
 */
export const isFutureDate = function (input) {
  const dateError = document.querySelector("#date-error");
  if (new Date(input.value) - new Date() <= 0) {
    input.focus();
    dateError.innerHTML = `<p class="text-danger mt-0 pt-1">Please select a future date.</p>`;
    return false;
  }
  dateError.innerHTML = "";
  return true;
};

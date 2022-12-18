/**
 * Adds delay that is refreshed as the trigging action is repeated in succession to prevent the function running after each action
 * https://www.joshwcomeau.com/snippets/javascript/debounce/
 * @param {Function} callback
 * @param {Number} wait milliseconds
 * @returns {callback}
 */
export const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
};

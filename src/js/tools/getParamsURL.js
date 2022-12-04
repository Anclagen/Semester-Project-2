/**
 * Returns the requested params for the url querystring
 * @param {String} parameter query string required
 * @returns {String} returns the query string details
 */
export const getParamURL = function (parameter) {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  return params.get(parameter);
};

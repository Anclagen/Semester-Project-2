/**
 * The sorts based on selected radio button
 * @param {Array} filteredListings array of active listings
 * @returns {Array} of sorted results
 */
export function sortListings(filteredListings) {
  const checked = document.querySelector("input[type=radio]:checked").value;
  let sortedListings = [];
  if (checked === "newest") {
    sortedListings = filteredListings.sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  } else if (checked === "ends-soon") {
    sortedListings = filteredListings.sort(
      (a, b) => new Date(a.endsAt) - new Date(b.endsAt)
    );
  } else if (checked === "popular") {
    sortedListings = filteredListings.sort(
      (a, b) => b.bids.length - a.bids.length
    );
  }
  return sortedListings;
}

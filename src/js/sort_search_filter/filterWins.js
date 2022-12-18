/**
 * Compares bid on item listings to wins array ids to return won listings.
 * @param {Object} profile users profile
 * @param {Array} bids array of bid on items
 * @returns {Array} Filtered listing that were won.
 */
export const filterWonListings = function (profile, bids) {
  const wins = profile.wins;

  let bidOnListings = [];
  let duplicatesIds = [];

  //sort to make sure top bids go in first.
  bids.sort((a, b) => b.amount - a.amount);

  bids.forEach((bid) => {
    bidOnListings.push({ ...bid.listing, bids: [{ amount: bid.amount }] });
  });

  const uniqueListings = bidOnListings.filter((element) => {
    if (!duplicatesIds.includes(element.id)) {
      duplicatesIds.push(element.id);
      return true;
    }
  });

  const wonListings = uniqueListings.filter((listing) =>
    wins.includes(listing.id)
  );
  wonListings.sort((a, b) => new Date(b.endsAt) - new Date(a.endsAt));
  return wonListings;
};

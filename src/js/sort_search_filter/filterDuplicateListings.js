/**
 * Filters out finished bid on listings, removes duplicates and return array of active bid on listings.
 * @param {Array} profileBids Array of bid on listings.
 * @returns {Array} array of unique active listings user has bid on.
 */
export const sortFilterBidOn = function (profileBids) {
  let activeBids = [];
  let duplicatesIds = [];

  //sort to make sure top bids go in first.
  profileBids.sort((a, b) => b.amount - a.amount);

  profileBids.forEach((bid) => {
    if (new Date(bid.listing.endsAt) - new Date() > 0) {
      activeBids.push({
        id: bid.listing.id,
        card: { ...bid.listing, bids: { amount: bid.amount } },
      });
    }
  });

  const uniqueListings = activeBids.filter((element) => {
    if (!duplicatesIds.includes(element.id)) {
      duplicatesIds.push(element.id);
      return true;
    }
  });

  const sortedUniqueList = uniqueListings.sort(
    (a, b) => new Date(a.card.endsAt) - new Date(b.card.endsAt)
  );

  return sortedUniqueList;
};

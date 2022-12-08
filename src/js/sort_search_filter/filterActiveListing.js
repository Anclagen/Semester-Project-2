export const filterActiveListings = function (listingData) {
  const newArray = [...listingData];
  const filteredData = newArray.filter(
    (listing) => new Date(listing.endsAt) - new Date() > 0
  );

  return filteredData;
};

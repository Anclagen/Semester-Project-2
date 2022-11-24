export const createListingCard = function ({ title, endsAt, media, bids }) {
  let bidAmount = `No Bids!`;
  if (bids.length > 0) {
    bidAmount = `£${bids[0].amount}`;
  }

  const timeLeft = endsAt;

  const listing = `<div class="container-fluid p-2 p-xl-3 col-sm-6 col-md-4 col-lg-3">
                    <div class="bg-white p-2 listing-card">
                      <a href="specific.html">
                      <img class="w-100" src="${media[0]}" alt="${title}" />
                      </a>
                      <h3>${title}</h3>
                      <p>Current Bid: ${bidAmount}</p>
                      <p>Time Left: ${timeLeft}</p>
                    </div>
                   <div>`;
  return listing;
};

import { timeLeft } from "../tools/timeLeft.js";
import { renderImageSlider } from "./createImageSlider.js";

export const updateSpecificListingDetails = function (
  { title, bids, endsAt, description, media, seller },
  { credits }
) {
  let winningBidAmount = 0;
  let winningUser = "No Bidders";
  const sortedBids = bids.sort((a, b) => b.amount - a.amount);
  if (bids.length > 0) {
    //sorted due to weird bug that gave me the
    winningBidAmount = sortedBids[0].amount;
    winningUser = sortedBids[0].bidderName;
  }

  const listingTitle = document.querySelector("h1");
  listingTitle.innerText = title;

  const listingTimeLeft = document.querySelector("#time-left");
  listingTimeLeft.append(timeLeft(endsAt));

  const listingNumberBids = document.querySelector("#number-bids");
  listingNumberBids.innerText = `Totals Bids: ${bids.length}`;

  console.log(bids.length);
  const listingWinningBid = document.querySelector("#winning-bid-amount");
  listingWinningBid.innerText = `£${winningBidAmount}.00`;

  const listingWinner = document.querySelector("#winning-user");
  listingWinner.innerText = `${winningUser}`;

  const listingMinimumBid = document.querySelector("#minimum-amount");
  listingMinimumBid.innerText = `£${winningBidAmount + 1}.00`;

  const listingYourBid = document.querySelector("#bid-amount");
  listingYourBid.min = winningBidAmount + 1;
  listingYourBid.value = winningBidAmount + 1;
  listingYourBid.max = credits;

  const listingDescription = document.querySelector(
    "#listing-description-content"
  );
  listingDescription.innerText = description;

  const listingBidHistory = document.querySelector("#bid-history-content");
  if (bids.length > 0) {
    listingBidHistory.innerHTML = "";
    sortedBids.forEach((bid) => {
      listingBidHistory.innerHTML += `<li>
                                        <strong>${bid.bidderName}:</strong> £${
        bid.amount
      }.00, <strong class="ms-3">Placed: </strong>${new Date(
        bid.created
      ).toLocaleDateString()}
                                      </li>`;
    });
  }

  const listingSellerInfo = document.querySelector("#seller-info-content");
  listingSellerInfo.innerHTML = `<a href="./profile.html?user=${seller.name}">
                                  <div class="text-center">
                                    <img class="seller-info-avatar rounded-circle" src="${seller.avatar}" alt="${seller.name} avatar" />
                                  </div>
                                    <p>Name: ${seller.name}</p>
                                    <p>Contact: ${seller.email}</p>
                                  </a>`;

  if (media.length > 0) {
    renderImageSlider(media);
  }
};

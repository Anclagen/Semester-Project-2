import { timeLeft } from "../../tools/timeLeft.js";
import { renderImageSlider } from "../createImageSlider.js";
import { storage } from "../../storage/storage.js";

export const updateSpecificListingDetails = function ({
  title,
  bids,
  endsAt,
  description,
  media,
  seller,
}) {
  let winningBidAmount = 0;
  let winningUser = "No Bidders";
  const sortedBids = bids.sort((a, b) => b.amount - a.amount);
  if (bids.length > 0) {
    //sorted due to weird bug that gave me the
    winningBidAmount = sortedBids[0].amount;
    winningUser = sortedBids[0].bidderName;
  }

  const listingTitle = document.querySelector("h1");
  listingTitle.innerHTML = "";
  listingTitle.innerText = title;

  const listingTimeBids = document.querySelector("#time-bids");
  listingTimeBids.innerHTML = "";
  listingTimeBids.append(timeLeft(endsAt));
  listingTimeBids.innerHTML += `<span class="ms-3" id="number-bids">Totals Bids: ${bids.length}<span>`;

  const listingWinningBid = document.querySelector("#winning-bid-amount");
  listingWinningBid.innerHTML = `£${winningBidAmount}.00`;

  const listingWinner = document.querySelector("#winning-user");
  listingWinner.innerHTML = `${winningUser}`;

  const listingMinimumBid = document.querySelector("#minimum-amount");
  listingMinimumBid.innerHTML = `£${winningBidAmount + 1}.00`;

  const listingYourBid = document.querySelector("#bid-amount");
  listingYourBid.min = winningBidAmount + 1;
  listingYourBid.value = winningBidAmount + 1;
  //if user is profile present gets credit to set max bid
  if (storage.get("profile")) {
    listingYourBid.max = storage.get("profile").credits;
  }

  const listingDescription = document.querySelector(
    "#listing-description-content"
  );
  listingDescription.innerHTML = "";
  if (!description) {
    description = "No description provided";
  }
  listingDescription.innerText = description;

  const listingBidHistory = document.querySelector("#bid-history-content");
  if (bids.length > 0) {
    listingBidHistory.innerHTML = "";
    sortedBids.forEach((bid) => {
      listingBidHistory.innerHTML += `<tr>
                                        <td><strong>${
                                          bid.bidderName
                                        }:</strong> £${bid.amount}.00,</td>
                                        <td><strong class="ms-3">Placed: </strong> ${new Date(
                                          bid.created
                                        ).toLocaleDateString()}</td>
                                      </tr>`;
    });
  }

  const listingSellerInfo = document.querySelector("#seller-info-content");
  listingSellerInfo.innerHTML = `<a href="./profile.html?user=${seller.name}">
                                  <div class="text-center">
                                    <img class="seller-info-avatar rounded-circle" src="${seller.avatar}" alt="${seller.name}'s avatar" onerror='this.src../images/default-avatar.png' />
                                  </div>
                                    <p>Name: ${seller.name}</p>
                                    <p>Contact: ${seller.email}</p>
                                  </a>`;

  if (media.length > 0) {
    renderImageSlider(media);
  } else {
    renderImageSlider(["../images/empty_image.jpg"]);
  }
};

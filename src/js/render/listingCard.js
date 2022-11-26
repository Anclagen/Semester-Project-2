import { timeLeft } from "../tools/timeLeft.js";

export const createListingCard = function ({ id, title, endsAt, media, bids }) {
  let bidAmount = `No Bids!`;
  if (bids.length > 0) {
    bidAmount = `£${bids[0].amount}`;
  }

  const listing = document.createElement("div");
  listing.classList = "p-2 p-xl-3 col-sm-6 col-md-4 col-lg-3 listing-card";

  const listingInnerContainer = document.createElement("div");
  listingInnerContainer.classList =
    "container-fluid h-100 p-1 bg-white rounded-2";
  listing.append(listingInnerContainer);

  const listingLink = document.createElement("a");
  listingLink.href = `specific.html?id=${id}`;
  listingLink.classList = `h-100 d-block`;
  listingInnerContainer.append(listingLink);

  const imageOuterContainer = document.createElement("div");
  imageOuterContainer.classList = "listing-image-container";
  listingLink.append(imageOuterContainer);

  const imageInnerContainer = document.createElement("div");
  imageInnerContainer.classList = "listing-image-container";
  imageOuterContainer.append(imageInnerContainer);

  const listingImage = document.createElement("img");
  listingImage.classList = "w-100";
  listingImage.src = media[0];
  listingImage.alt = title;
  imageInnerContainer.append(listingImage);

  const listingTitle = document.createElement("h3");
  listingTitle.innerText = title;
  listingTitle.classList = "mt-2";
  listingLink.append(listingTitle);

  const listingPrice = document.createElement("p");
  listingPrice.innerText = `Current Bid: ${bidAmount}`;
  listingLink.append(listingPrice);

  const listingTime = document.createElement("p");
  listingTime.append(timeLeft(endsAt));
  listingLink.append(listingTime);

  return listing;
};

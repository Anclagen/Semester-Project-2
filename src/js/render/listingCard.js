import { timeLeft } from "../tools/timeLeft.js";

export const createListingCard = function ({ id, title, endsAt, media, bids }) {
  let bidAmount = `No Bids!`;
  if (bids.length > 0) {
    const sortedBids = bids.sort((a, b) => b.amount - a.amount);
    bidAmount = `£${sortedBids[0].amount}`;
  }

  if (media.length === 0) {
    media[0] = "";
  }

  const listing = document.createElement("div");
  listing.classList = "p-2 p-xl-3 col-sm-6 col-md-4 col-lg-3 listing-card";

  const listingInnerContainer = document.createElement("div");
  listingInnerContainer.classList =
    "container-fluid h-100 p-2 bg-white rounded-2";
  listing.append(listingInnerContainer);

  const listingLink = document.createElement("a");
  const currentPage = window.location.href;

  listingLink.classList = `h-100 d-flex flex-column align-content-around`;
  listingInnerContainer.append(listingLink);

  const imageOuterContainer = document.createElement("div");
  imageOuterContainer.classList = "listing-image-container";
  listingLink.append(imageOuterContainer);

  const imageInnerContainer = document.createElement("div");
  imageInnerContainer.classList = "listing-image-container rounded";
  imageOuterContainer.append(imageInnerContainer);

  const listingImage = document.createElement("img");
  listingImage.classList = "w-100";
  listingImage.src = media[0];
  listingImage.alt = title;
  imageInnerContainer.append(listingImage);

  if (currentPage.match("index.html")) {
    listingLink.href = `pages/specific.html?id=${id}`;
    listingImage.setAttribute("onerror", "this.src='./images/404_image.jpg'");
  } else {
    listingLink.href = `specific.html?id=${id}`;
    listingImage.setAttribute("onerror", "this.src='../images/404_image.jpg'");
  }

  const listingTitle = document.createElement("h3");
  listingTitle.innerText = title;
  listingTitle.classList = "mt-2 flex-fill px-1";
  listingLink.append(listingTitle);

  const listingPrice = document.createElement("p");
  listingPrice.classList = "px-1 listing-price";
  listingPrice.innerText = `Winning Bid: ${bidAmount}`;
  listingLink.append(listingPrice);

  const listingTime = document.createElement("p");
  listingTime.classList = "bg-secondary p-1";
  listingTime.append(timeLeft(endsAt));
  listingLink.append(listingTime);

  return listing;
};

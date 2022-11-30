import { placeABid } from "../../api/listing/placeBid.js";

export const placeBidFormListener = async function (event) {
  event.preventDefault();
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  let id = params.get("id");
  console.log(event.target.amount.value);
  const response = await placeABid(id, Number(event.target.amount.value));
  console.log(response);
  location.reload();
};

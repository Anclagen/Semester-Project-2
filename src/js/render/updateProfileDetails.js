export const updateProfileDetails = function ({
  name,
  email,
  credits,
  avatar,
  listings,
}) {
  const username = document.querySelector("h1");
  const avatarImage = document.querySelector("#userAvatarImage");
  const contactInfo = document.querySelector("#contact-info");
  const balance = document.querySelector("#balance");
  // unless path added will need to do some filtering
  //const bids = document.querySelector("#bids");
  const numberOfListings = document.querySelector("#active-listings");
  username.innerHTML = name;
  avatarImage.src = avatar;
  contactInfo.innerHTML = email;
  balance.innerHTML = "£" + credits;
  numberOfListings.innerHTML = listings.length;
};

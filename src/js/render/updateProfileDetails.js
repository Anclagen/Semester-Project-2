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
  contactInfo.innerHTML = email;
  balance.innerHTML = "£" + credits;
  numberOfListings.innerHTML = listings.length;
  avatarImage.src = avatar;
  avatarImage.alt = `${name}'s avatar`;
  if (avatar === "") {
    avatarImage.src = "../images/default-avatar.png";
  }
};

import { countdown } from "./countdown.js";

export const timeLeft = function (endsAt) {
  const totalSeconds = (new Date(endsAt) - new Date()) / 1000;
  let countdownTime = document.createElement("span");

  if (totalSeconds < 0) {
    countdownTime.innerHTML = "Listing has finished!";
    countdownTime.classList = "col-6";
    return countdownTime;
  }

  // const secondsLeft = Math.floor(totalSeconds % 60);
  const minutesLeft = Math.floor((totalSeconds / 60) % 60);
  const hoursLeft = Math.floor((totalSeconds / 3600) % 24);
  const daysLeft = Math.floor((totalSeconds / 86400) % 30);
  const monthsLeft = Math.floor((totalSeconds / 2592000) % 12);

  if (monthsLeft > 0) {
    countdownTime.innerHTML = `<i class="fa-regular fa-clock"></i> ${monthsLeft} Months, ${daysLeft} Days`;
  } else if (daysLeft > 0) {
    countdownTime.innerHTML = `<i class="fa-regular fa-clock"></i> ${daysLeft} Days, ${hoursLeft} Hours`;
  } else if (hoursLeft > 0) {
    countdownTime.innerHTML = `<i class="fa-regular fa-clock"></i> ${hoursLeft} Hours, ${minutesLeft} Minutes`;
  } else {
    countdownTime = countdown(totalSeconds);
  }

  countdownTime.classList = "col-6";
  //countdown timer? need to build listing with document create element.
  return countdownTime;
};

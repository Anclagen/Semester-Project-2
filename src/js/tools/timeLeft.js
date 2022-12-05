import { countdown } from "./countdown.js";

export const timeLeft = function (endsAt) {
  const totalSeconds = (new Date(endsAt) - new Date()) / 1000;

  if (totalSeconds < 0) {
    return "Listing has finished!";
  }

  // const secondsLeft = Math.floor(totalSeconds % 60);
  const minutesLeft = Math.floor((totalSeconds / 60) % 60);
  const hoursLeft = Math.floor((totalSeconds / 3600) % 24);
  const daysLeft = Math.floor((totalSeconds / 86400) % 30);
  const monthsLeft = Math.floor((totalSeconds / 2592000) % 12);

  if (monthsLeft > 0) {
    return `Ends In: ${monthsLeft} Months, ${daysLeft} Days`;
  }

  if (daysLeft > 0) {
    return `Ends In: ${daysLeft} Days, ${hoursLeft} Hours`;
  }

  if (hoursLeft > 0) {
    return `Ends In: ${hoursLeft} Hours, ${minutesLeft} Minutes`;
  }

  //countdown timer? need to build listing with document create element.
  return countdown(totalSeconds);
};

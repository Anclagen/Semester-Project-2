export const countdown = function (totalSeconds) {
  const countdownTimer = document.createElement("span");

  const countdown = setInterval(() => {
    totalSeconds -= 1;

    const secondsLeft = ("0" + Math.floor(totalSeconds % 60)).slice(-2);
    const minutesLeft = ("0" + Math.floor((totalSeconds / 60) % 60)).slice(-2);

    countdownTimer.innerHTML = `<i class="fa-regular fa-clock"></i> ${minutesLeft}:${secondsLeft}`;

    if (totalSeconds <= 0) {
      countdownTimer.innerHTML = "Bidding Is Over";
      clearInterval(countdown);
    }
  }, 1000);

  return countdownTimer;
};

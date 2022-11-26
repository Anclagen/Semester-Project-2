export const countdown = function (totalSeconds) {
  const countdownTimer = document.createElement("p");

  const countdown = setInterval(() => {
    totalSeconds -= 1;

    if (totalSeconds <= 0) {
      clearInterval(countdown);
      countdownTimer.innerHTML = "Bidding Is Over";
    }

    const secondsLeft = ("0" + Math.floor(totalSeconds % 60)).slice(-2);
    const minutesLeft = Math.floor((totalSeconds / 60) % 60);

    countdownTimer.innerHTML = `${minutesLeft}:${secondsLeft}`;
  }, 1000);

  return countdownTimer;
};

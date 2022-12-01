export const countdown = function (totalSeconds) {
  const countdownTimer = document.createElement("span");

  const countdown = setInterval(() => {
    totalSeconds -= 1;

    if (totalSeconds <= 0) {
      countdownTimer.innerHTML = "Time Left: Bidding Is Over";
      clearInterval(countdown);
    }

    const secondsLeft = ("0" + Math.floor(totalSeconds % 60)).slice(-2);
    const minutesLeft = Math.floor((totalSeconds / 60) % 60);

    countdownTimer.innerHTML = `Time Left: ${minutesLeft}:${secondsLeft}`;
  }, 1000);

  return countdownTimer;
};

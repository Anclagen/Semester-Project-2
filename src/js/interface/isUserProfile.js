/**
 * Shows update button and sensitive details if profile is logged in user
 */
export const showSensitiveDetails = function () {
  const sensitiveDetails = document.querySelectorAll(
    "[data-isUsersProfile=true]"
  );
  console.log(sensitiveDetails);
  sensitiveDetails.forEach((item) => item.classList.remove("hidden"));
};

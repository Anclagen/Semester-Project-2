import { getHiddenHeight } from "./getContainerHeight.js";

/**
 * shows/hides an input, and enable/disables the input
 * @param {Element} input container to open/close
 */
export function showInputContainer(input) {
  if (input.classList.contains("hidden")) {
    input.removeAttribute("disabled");
    input.classList.toggle("hidden");
    setTimeout(function () {
      input.classList.toggle("open");
      input.style.height = `${getHiddenHeight(input)}px`;
    }, 20);
  } else {
    input.setAttribute("disabled", "");
    input.classList.toggle("open");
    input.style.height = `0px`;
    setTimeout(function () {
      input.classList.toggle("hidden");
    }, 500);
  }
}

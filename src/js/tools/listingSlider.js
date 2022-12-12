import { createListingCard } from "../render/listingCard.js";

/**
 * Image slider configured for a max of 20 listings in the slider from data provided
 * @param {*} data
 * @param {*} container
 * @param {*} next
 * @param {*} nextArrow
 * @param {*} previous
 * @param {*} previousArrow
 */
export const setupListingSlider = function (data, container) {
  const sliderContentContainer = container.querySelector(".listing-slider");
  const nextArrow = container.querySelector(".next-arrow");
  const previousArrow = container.querySelector(".previous-arrow");

  /*-------------- Responsive Latest content slider -----------------*/
  // variables for slider functionality.
  let sliderLengthMax = 20;
  let slidePercentage = 5;
  let transformMax = 95;
  let transform = 0;

  /*-------------- Event listeners For Slider -----------------*/
  /* Limited to 20 posts max, resizes from 1 to 2 to 4 posts at a time 
   depending on the screen size*/

  //creates upto 20 slides content
  function createSliderContent(data) {
    sliderContentContainer.innerHTML = "";
    if (data.length < 20) {
      sliderLengthMax = data.length;
    }
    disableButtons();
    for (let i = 0; i < data.length; i++) {
      if (i === 20) {
        sliderLengthMax = 20;
        break;
      }
      const sliderContentWrap = document.createElement("div");
      sliderContentWrap.classList = "slider-listing-content";

      const listingCard = createListingCard(data[i]);
      //overwrite grid classes
      listingCard.classList = "p-2 p-xl-3 listing-card h-100";
      sliderContentWrap.append(listingCard);
      sliderContentContainer.append(sliderContentWrap);
    }
  }

  createSliderContent(data);

  // transforms slider
  function transformSlider() {
    sliderContentContainer.style.transform = `translateX(-${transform}%)`;
  }

  /* Calculates correct transform and transform max for screen size
   use 0 to resize, 1 for next, and -1 for previous page changes*/
  function calculateTransform(num) {
    if (window.innerWidth < 500) {
      transform += 5 * num;
      transformMax = (sliderLengthMax - 1) * slidePercentage;
    } else if (window.innerWidth >= 1100) {
      transform += 20 * num;
      transformMax = (sliderLengthMax - 4) * slidePercentage;
      if (transform > transformMax) {
        transform = (sliderLengthMax - 4) * slidePercentage;
      }
    } else if (window.innerWidth >= 900) {
      transform += 20 * num;
      transformMax = (sliderLengthMax - 3) * slidePercentage;
      if (transform > transformMax) {
        transform = (sliderLengthMax - 3) * slidePercentage;
      }
    } else if (window.innerWidth >= 500) {
      transform += 10 * num;
      transformMax = (sliderLengthMax - 2) * slidePercentage;
      if (transform > transformMax) {
        transform = (sliderLengthMax - 2) * slidePercentage;
      }
    }
    if (transform < 0) {
      transform = 0;
    }
  }

  // disables buttons
  function disableButtons() {
    //disables previous at slider start
    if (transform === 0) {
      previousArrow.style.display = "none";
    } else {
      previousArrow.style.display = "block";
    }
    //disables next if max transform reached
    if (transform === transformMax) {
      nextArrow.style.display = "none";
    }
    if (transform < transformMax) {
      nextArrow.style.display = "block";
    }
  }

  //function for resize listener to update slider on window resize.
  function adjustSliderWidths() {
    calculateTransform(0);
    transformSlider();
    disableButtons();
  }

  //change page functions for listeners
  function previousPage() {
    calculateTransform(-1);
    transformSlider();
    disableButtons();
  }

  function nextPage() {
    calculateTransform(1);
    transformSlider();
    disableButtons();
  }

  window.addEventListener("resize", adjustSliderWidths);
  previousArrow.addEventListener("click", previousPage);
  nextArrow.addEventListener("click", nextPage);
};

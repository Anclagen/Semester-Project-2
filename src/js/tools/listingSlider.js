import { createListingCard } from "../render/listingCard.js";

/**
 * Fills and sets up a listing slider.
 * @param {Array} data Array of listing data objects
 * @param {Element} container this should be the outer div of the slider template.
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

  /**
   * Takes listing data creates and modifies listing cards for use in slider
   * @param {Array} data listing data array
   */
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

  /**
   * Moves the slider by the transform percentage
   */
  function transformSlider() {
    sliderContentContainer.style.transform = `translateX(-${transform}%)`;
  }

  /**
   * Adds and removes tab index for hidden cards
   * @param {Number} numberOfSlides number of slider on display
   */
  function addTabIndex(numberOfSlides) {
    const listingsCards = container.querySelectorAll("a");
    listingsCards.forEach((card) => card.setAttribute("tabindex", "-1"));
    const startIndex = transform / 5;
    const finishIndex = startIndex + numberOfSlides - 1;
    listingsCards.forEach((card, i) => {
      if (i >= startIndex && i <= finishIndex) {
        card.removeAttribute("tabindex");
      }
    });
  }

  /**
   * Calculates correct transform and transform max for screen size
   * @param {Number} num use 0 to resize, 1 for next, and -1 for previous page changes
   */
  function calculateTransform(num) {
    if (window.innerWidth < 500) {
      transform += 5 * num;
      transformMax = (sliderLengthMax - 1) * slidePercentage;
      addTabIndex(1);
    } else if (window.innerWidth >= 1100) {
      transform += 20 * num;
      transformMax = (sliderLengthMax - 4) * slidePercentage;
      if (transform > transformMax) {
        transform = (sliderLengthMax - 4) * slidePercentage;
      }
      addTabIndex(4);
    } else if (window.innerWidth >= 900) {
      transform += 20 * num;
      transformMax = (sliderLengthMax - 3) * slidePercentage;
      if (transform > transformMax) {
        transform = (sliderLengthMax - 3) * slidePercentage;
      }
      addTabIndex(3);
    } else if (window.innerWidth >= 500) {
      transform += 10 * num;
      transformMax = (sliderLengthMax - 2) * slidePercentage;
      if (transform > transformMax) {
        transform = (sliderLengthMax - 2) * slidePercentage;
      }
      addTabIndex(2);
    }

    if (transform < 0) {
      transform = 0;
    }
  }

  /**
   * hides control arrows based on sliders position
   */
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

  //Initial setup of sliders tab-indexes
  calculateTransform(0);

  //listeners for the window and slider controls
  window.addEventListener("resize", adjustSliderWidths);
  previousArrow.addEventListener("click", previousPage);
  nextArrow.addEventListener("click", nextPage);
};

/* Framework for the listings slider.
        <div id="ending-soon-slider" class="listings-slider-outer-container p-1 px-sm-2 px-md-3 px-lg-4">
          <button type="button" tabindex="0" class="previous-arrow"><span class="visually-hidden">Previous</span></button>
          <button type="button" tabindex="0" class="next-arrow"><span class="visually-hidden">Next</span></button>
          <div class="listing-slider-rails">
            <div class="listing-slider">
              <div class="slider-listing-content">...</div>
              <div class="slider-listing-content">...</div>
              <div class="slider-listing-content">...</div>
              ....
            </div>
          </div>
        </div>
*/

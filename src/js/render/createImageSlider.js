export const renderImageSlider = function (media) {
  const listingMainSlider = document.querySelector(".main-specific-slider");
  const listingThumbSlider = document.querySelector(".thumbs-specific-slider");
  listingMainSlider.innerHTML = "";
  listingThumbSlider.innerHTML = "";

  media.forEach((image, index) => {
    let active = "";
    if (index === 0) {
      active = "active";
    }

    listingMainSlider.innerHTML += `<div class="carousel-item ${active}">
                                      <div class="specific-outer-slider">
                                        <div class="specific-inner-slider">
                                          <img id="listing-image" src="${image}" onerror="src='../images/empty_image.jpg'" alt="Item image ${
      index + 1
    }" />
                                        </div>
                                      </div>
                                    </div>`;
    listingThumbSlider.innerHTML += `<a type="button" data-bs-target="#specific" data-bs-slide-to="${index}" class="thumbs ${active}" aria-current="true" aria-label="Slide ${
      index + 1
    }">
                                      <img id="listing-image" class="thumb-image" src="${image}" onerror="src='../images/empty_image.jpg'" alt="Item image" />
                                    </a>`;
  });
};

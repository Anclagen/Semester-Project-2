/**
 * adds 12 card skeletons to page while results load.
 * @param {Element} container
 */
export const skeletonLoaderListingCards = function (container) {
  const template = `<div class="p-2 p-xl-3 col-sm-6 col-md-4 col-lg-3 listing-card">
                      <div class="container-fluid h-100 p-2 bg-white rounded-2">
                        <div class="h-100 d-flex flex-column align-content-around">
                          <div class="listing-image-container">
                            <div class="listing-image-container rounded">
                              <div class="skeleton w-100 h-100"></div>
                            </div>
                          </div>
                          <div class="mt-2 flex-fill px-1">
                            <div class="skeleton skeleton-text w-100"></div>
                            <div class="skeleton skeleton-text w-75"></div>
                          </div>
                          <div class="px-1 py-2"><div class="skeleton skeleton-text w-75"></div></div>
                          <div class="px-1 pt-1"><div class="px-1 mb-2 skeleton skeleton-text w-100"></div></div>
                        </div>
                      </div>
                    </div>
                    `;
  for (let index = 0; index < 12; index++) {
    container.innerHTML += template;
  }
};

const searchBar = document.querySelector("form[role=search]");

/**
 * Nav bar search listener to redirect users to listing page
 */
export const searchBarListener = function () {
  searchBar.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = event.target.search.value;
    const currentPage = window.location.href;
    if (currentPage.match("/pages/")) {
      window.location.href = `./listings.html?search=${query}`;
    } else {
      window.location.href = `./pages/listings.html?search=${query}`;
    }
  });
};

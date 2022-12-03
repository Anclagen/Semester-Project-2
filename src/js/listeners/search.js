const searchBar = document.querySelector("form[role=search]");

export const searchBarListener = function () {
  searchBar.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = event.target.search.value;
    const currentPage = window.location.href;
    if (currentPage.match("index.html")) {
      window.location.href = `./pages/listings.html?search=${query}`;
    } else {
      window.location.href = `./listings.html?search=${query}`;
    }
  });
};

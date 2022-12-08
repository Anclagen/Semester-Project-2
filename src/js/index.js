import { authenticate } from "./pages/authenticate.js";
import { isUserLoggedIn } from "./interface/isLoggedIn.js";
import { profileSetup } from "./pages/profile.js";
import { homeSetup } from "./pages/home.js";
import { createUpdatePageSetup } from "./pages/create.js";
import { specificPageSetup } from "./pages/specific.js";
import { listingPageSetup } from "./pages/listing.js";
import { searchBarListener } from "./listeners/search.js";
import { updateNavAvatar } from "./interface/navAvatar.js";

isUserLoggedIn();
searchBarListener();
updateNavAvatar();

const currentPage = window.location.href;

if (currentPage.match("authenticate.html")) {
  authenticate();
} else if (currentPage.match("profile.html")) {
  profileSetup();
} else if (currentPage.match("create.html")) {
  createUpdatePageSetup();
} else if (currentPage.match("specific.html")) {
  specificPageSetup();
} else if (currentPage.match("listings.html")) {
  listingPageSetup();
} else if (currentPage.match("index.html") || currentPage.match("./")) {
  homeSetup();
}

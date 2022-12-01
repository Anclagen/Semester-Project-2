import { authenticate } from "./pages/authenticate.js";
import { isUserLoggedIn } from "./interface/isLoggedIn.js";
import { profileSetup } from "./pages/profile.js";
import { homeSetup } from "./pages/home.js";
import { createUpdatePageSetup } from "./pages/create.js";
import { specificPageSetup } from "./pages/specific.js";

isUserLoggedIn();

const currentPage = window.location.href;

if (currentPage.match("authenticate.html")) {
  authenticate();
} else if (currentPage.match("profile.html")) {
  profileSetup();
} else if (currentPage.match("index.html")) {
  homeSetup();
} else if (currentPage.match("create.html")) {
  createUpdatePageSetup();
} else if (currentPage.match("specific.html")) {
  specificPageSetup();
} else {
  console.log("errrm, dude where are we?!?!");
}

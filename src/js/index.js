import { authenticate } from "./pages/authenticate.js";
import { isUserLoggedIn } from "./interface/isLoggedIn.js";
import { profileSetup } from "./pages/profile.js";

isUserLoggedIn();

const currentPage = window.location.href;

if (currentPage.match("authenticate.html")) {
  authenticate();
} else if (currentPage.match("profile.html")) {
  profileSetup();
} else {
  console.log("errrm");
}

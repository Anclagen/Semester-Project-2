import { authenticate } from "./pages/authenticate.js";
import { isUserLoggedIn } from "./interface/isLoggedIn.js";

isUserLoggedIn();
const currentPage = window.location.href;

if (currentPage.match("authenticate.html")) {
  authenticate();
} else {
  console.log("errrm");
}

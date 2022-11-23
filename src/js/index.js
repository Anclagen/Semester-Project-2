import { authenticate } from "./pages/authenticate.js";
const currentPage = window.location.href;

if (currentPage.match("authenticate.html")) {
  authenticate();
} else {
  console.log("errrm");
}

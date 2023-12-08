import { isLoggedIn } from "../api/auth/isLoggedIn.js";

const loggedInIcons = document.querySelector("#logged-in-header-icons");
const notLoggedInIcons = document.querySelector("#logged-out-header-icons");

if (isLoggedIn()) {
  // If logged in display the icons for logged in
  loggedInIcons.style.display = "block";
  notLoggedInIcons.style.display = "none";
} else {
  // and if user is logged out
  loggedInIcons.style.display = "none";
  notLoggedInIcons.style.display = "block";
}

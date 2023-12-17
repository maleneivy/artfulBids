import { isLoggedIn } from "../api/auth/isLoggedIn.js";
import { getActiveLink } from "../utils/activeLink.js";
import { credits } from "../utils/storage.mjs";

// Header I can call on every page

export function createHeader() {
  const header = document.querySelector("header");
  header.classList.add("sticky");

  const nav = document.createElement("nav");
  nav.className = "navbar navbar-expand-xs bg-body-primary";

  const container = document.createElement("div");
  container.className = "container-fluid px-md-5 px-3";

  const toggleButton = document.createElement("button");
  toggleButton.className = "navbar-toggler";
  toggleButton.type = "button";
  toggleButton.setAttribute("data-bs-toggle", "collapse");
  toggleButton.setAttribute("data-bs-target", "#navbarNavAltMarkup2");
  toggleButton.setAttribute("aria-controls", "navbarNavAltMarkup2");
  toggleButton.setAttribute("aria-expanded", "false");
  toggleButton.setAttribute("aria-label", "Toggle navigation");
  const toggleSpan = document.createElement("span");
  toggleSpan.className = "navbar-toggler-icon";
  toggleButton.appendChild(toggleSpan);

  const brandLink = document.createElement("a");
  brandLink.className = "navbar-brand";
  brandLink.href = "#";
  brandLink.textContent = "Artful Bids";

  const loggedOutHeaderIcons = document.createElement("div");
  loggedOutHeaderIcons.id = "logged-out-header-icons";
  const userLinkLoggedOut = document.createElement("a");
  userLinkLoggedOut.href = "../html/log-in-register.html";
  const userIconLoggedOut = document.createElement("i");
  userIconLoggedOut.className = "fa-solid fa-user";
  userLinkLoggedOut.appendChild(userIconLoggedOut);
  loggedOutHeaderIcons.appendChild(userLinkLoggedOut);

  const loggedInHeaderIcons = document.createElement("div");
  loggedInHeaderIcons.id = "logged-in-header-icons";
  const creditInfo = document.createElement("a");
  creditInfo.id = "credit-info";
  creditInfo.style.display = "flex";
  const coinsIcon = document.createElement("i");
  coinsIcon.className = "fa-solid fa-coins";
  const creditsDisplay = document.createElement("h5");
  creditsDisplay.textContent = credits;
  creditsDisplay.classList.add("ms-1", "me-3", "mb-0");
  creditsDisplay.style.lineHeight = "1.5";
  const userLinkLoggedIn = document.createElement("a");
  userLinkLoggedIn.href = "/html/my-profile.html";
  const userIconLoggedIn = document.createElement("i");
  userIconLoggedIn.className = "fa-solid fa-user";
  loggedInHeaderIcons.appendChild(creditInfo);
  creditInfo.appendChild(coinsIcon);
  creditInfo.appendChild(creditsDisplay);
  userLinkLoggedIn.appendChild(userIconLoggedIn);
  loggedInHeaderIcons.appendChild(userLinkLoggedIn);

  const navbarCollapse = document.createElement("div");
  navbarCollapse.className = "collapse navbar-collapse";
  navbarCollapse.id = "navbarNavAltMarkup2";

  const navbarNav = document.createElement("div");
  navbarNav.className = "navbar-nav navbar-nav-header";
  const homeLink = document.createElement("a");
  homeLink.className = "nav-link mt-2 mb-1";
  homeLink.setAttribute("aria-current", "page");
  homeLink.href = "/html/index.html";
  homeLink.textContent = "Home";
  const aboutLink = document.createElement("a");
  aboutLink.className = "nav-link my-1";
  aboutLink.href = "/html/about.html";
  aboutLink.textContent = "About";
  const contactLink = document.createElement("a");
  contactLink.className = "nav-link my-1";
  contactLink.href = "/html/contact.html";
  contactLink.textContent = "Contact";

  navbarNav.appendChild(homeLink);
  navbarNav.appendChild(aboutLink);

  navbarNav.appendChild(contactLink);

  container.appendChild(toggleButton);
  container.appendChild(brandLink);
  container.appendChild(loggedOutHeaderIcons);
  container.appendChild(loggedInHeaderIcons);
  container.appendChild(navbarCollapse);
  navbarCollapse.appendChild(navbarNav);
  nav.appendChild(container);
  header.appendChild(nav);

  // Show/hide elements based on the login status
  if (isLoggedIn()) {
    loggedInHeaderIcons.style.display = "flex";
    loggedOutHeaderIcons.style.display = "none";
  } else {
    loggedInHeaderIcons.style.display = "none";
    loggedOutHeaderIcons.style.display = "block";
  }

  getActiveLink();
  return header;
}

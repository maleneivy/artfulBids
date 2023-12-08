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

  const searchFormMd = document.createElement("form");
  searchFormMd.className = "d-none d-md-flex";
  searchFormMd.role = "search";
  const searchInput = document.createElement("input");
  searchInput.className = "form-control me-2";
  searchInput.type = "search";
  searchInput.placeholder = "Search";
  searchInput.setAttribute("aria-label", "Search");
  const searchButton = document.createElement("button");
  searchButton.className = "btn btn-outline-success";
  searchButton.type = "submit";
  searchButton.textContent = "Search";
  searchFormMd.appendChild(searchInput);
  searchFormMd.appendChild(searchButton);

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
  userLinkLoggedIn.href = "";
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
  navbarNav.className = "navbar-nav";
  const homeLink = document.createElement("a");
  homeLink.className = "nav-link";
  homeLink.setAttribute("aria-current", "page");
  homeLink.href = "/html/index.html";
  homeLink.textContent = "Home";
  const aboutLink = document.createElement("a");
  aboutLink.className = "nav-link";
  aboutLink.href = "#";
  aboutLink.textContent = "About";
  const contactLink = document.createElement("a");
  contactLink.className = "nav-link";
  contactLink.href = "#";
  contactLink.textContent = "Contact";
  const searchFormSm = document.createElement("form");
  searchFormSm.className = "d-flex d-md-none";
  searchFormSm.role = "search";
  const searchInputSm = document.createElement("input");
  searchInputSm.className = "form-control me-2";
  searchInputSm.type = "search";
  searchInputSm.placeholder = "Search";
  searchInputSm.setAttribute("aria-label", "Search");
  const searchButtonSm = document.createElement("button");
  searchButtonSm.className = "btn btn-outline-success";
  searchButtonSm.type = "submit";
  searchButtonSm.textContent = "Search";
  searchFormSm.appendChild(searchInputSm);
  searchFormSm.appendChild(searchButtonSm);

  navbarNav.appendChild(homeLink);
  navbarNav.appendChild(aboutLink);

  navbarNav.appendChild(contactLink);
  navbarNav.appendChild(searchFormSm);

  container.appendChild(toggleButton);
  container.appendChild(brandLink);
  container.appendChild(searchFormMd);
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

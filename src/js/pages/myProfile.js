import { createHeader } from "../components/header.js";
import logOutButton from "../components/logOutButton.mjs";
import { userName, email, credits } from "../utils/storage.mjs";

createHeader();
logOutButton();

function createProfile() {
  const userInfoContainer = document.querySelector(".user-info-container");

  const greetingMessage = document.createElement("h2");
  greetingMessage.textContent = `Hello ${userName}`;

  const presentEmail = document.createElement("h5");
  presentEmail.textContent = `${email}`;

  userInfoContainer.appendChild(greetingMessage);
  userInfoContainer.appendChild(presentEmail);

  const creditsContainer = document.querySelector(".credits-container");

  const presentCredits = document.createElement("p");
  presentCredits.textContent = `Credits: ${credits}`;

  creditsContainer.appendChild(presentCredits);
}

createProfile();

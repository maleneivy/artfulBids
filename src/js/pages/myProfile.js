import { API_BASE_URL } from "../api/baseUrl.js";
import { createHeader } from "../components/header.js";
import logOutButton from "../components/logOutButton.mjs";
import { userName, email, credits, token } from "../utils/storage.mjs";

createHeader();
logOutButton();

async function getUserData() {
  try {
    const getUserProfileUrl = `${API_BASE_URL}/auction/profiles/${userName}?_listings=true`;

    const getData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(getUserProfileUrl, getData);
    const json = await response.json();
    console.log(response);
    console.log(json);

    const userCountListings = json._count.listings;

    createProfile(userCountListings);
  } catch (error) {
    console.log(error);
  }
}
getUserData();

function createProfile(userCountListings) {
  const userInfoContainer = document.querySelector(".user-info-container");

  const greetingMessage = document.createElement("h2");
  greetingMessage.textContent = `Hello ${userName}`;

  const presentEmail = document.createElement("h5");
  presentEmail.textContent = `${email}`;

  const presentTotalListings = document.createElement("p");
  presentTotalListings.textContent = `Total Listings: ${userCountListings}`;

  userInfoContainer.appendChild(greetingMessage);
  userInfoContainer.appendChild(presentEmail);

  const creditsContainer = document.querySelector(".credits-container");

  const presentCredits = document.createElement("p");
  presentCredits.textContent = `Credits: ${credits}`;

  creditsContainer.appendChild(presentCredits);
  userInfoContainer.appendChild(presentTotalListings);
}

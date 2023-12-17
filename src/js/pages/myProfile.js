import { API_BASE_URL } from "../api/baseUrl.js";
import { createFooter } from "../components/footer.js";
import { createHeader } from "../components/header.js";
import logOutButton from "../components/logOutButton.mjs";
import { formatDateTimeNorwegian } from "../utils/norwegianTimeFormat.mjs";
import { userName, email, credits, token, avatar } from "../utils/storage.mjs";

createHeader();
logOutButton();
createFooter();

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

    let jsonAvatar = json.avatar;

    const userCountListings = json._count.listings;
    const userListings = json.listings;
    createProfile(userCountListings, userListings, jsonAvatar);
  } catch (error) {
    console.log(error);
  }
}
getUserData();

function createProfile(userCountListings, userListings, jsonAvatar) {
  const avatarImage = document.querySelector("#avatarImage");
  jsonAvatar = avatar;
  avatarImage.src = jsonAvatar;
  if (avatarImage === null) {
    avatarImage.src = "/images/default/default-post-image.jpg";
  }

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

  userListings.forEach((listing) => {
    const listingsContainer = document.querySelector(".listings-container");

    const title = listing.title;
    let media = listing.media;
    media = media.toString();
    const tags = listing.tags;
    const endsAt = formatDateTimeNorwegian(listing.endsAt);
    const id = listing.id;

    //ListingCard (Card will link href to the specific listing)
    const listingCard = document.createElement("a");
    listingCard.href = `/html/specific-listing.html?id=${id}`;
    listingCard.classList.add(
      "card",
      "col-sm-12",
      "col-xs-2",
      "col-md-5",
      "m-2",
      "p-0",
    );

    // Body of the card
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "p-0");

    // Image for the cardBody
    let listingImage = document.createElement("img");
    listingImage.classList.add("card-img-top");

    if (!media) {
      listingImage.src = "../../../images/default/default-post-image.jpg";
    } else {
      // Split the media string into an array of image URLs
      const mediaUrls = media.split(",");

      // Select the first image from the array
      const firstImageUrl = mediaUrls[0].trim();

      // Set the src attribute for the listingImage
      listingImage.src = firstImageUrl;

      // Handle error for the first image
      listingImage.onerror = function () {
        console.log(`Error loading image: ${firstImageUrl}`);
        // set the default image in case of error
        listingImage.src = "../../../images/default/default-post-image.jpg";
        // Remove the onerror handler to prevent the default error message
        listingImage.onerror = null;
      };
    }

    // Title for the Cardbody
    let listingTitle = document.createElement("h5");
    listingTitle.classList.add("card-title", "p-2");
    listingTitle.textContent = title;

    // Categories/tags for the listing
    let listingTags = document.createElement("p");
    listingTags.classList.add("card-text", "p-2");
    if (tags.length === 0) {
      listingTags.textContent = `No tags`;
    } else {
      listingTags.textContent = tags;
    }

    // Ending time for listing
    let listingEndsAt = document.createElement("p");
    listingEndsAt.classList.add("card-text", "p-2");
    listingEndsAt.textContent = `Ends at:
    ${endsAt}`;
    listingEndsAt.style.whiteSpace = "pre-line";

    // Append the elements to the cardBody
    cardBody.appendChild(listingImage);
    cardBody.appendChild(listingTitle);
    cardBody.appendChild(listingTags);
    cardBody.appendChild(listingEndsAt);

    //Append the cardBody to the listingCard
    listingCard.appendChild(cardBody);

    // Append the listingCard to its container
    listingsContainer.appendChild(listingCard);
  });
}

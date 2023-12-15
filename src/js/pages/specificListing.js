import { isLoggedIn } from "../api/auth/isLoggedIn.js";
import { API_BASE_URL } from "../api/baseUrl.js";
import { createHeader } from "../components/header.js";
import { token } from "../utils/storage.mjs";
import { displayMessage } from "../utils/displayMessage.mjs";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const listingId = urlParams.get("id");

// Check if user is logged in
const bidButton = document.querySelector("#bidButton");
const logInButton = document.querySelector("#logInButton");
const hideBidInput = document.querySelector("#bidAmount");
if (token === null) {
  bidButton.style.display = "none";
  logInButton.style.display = "block";
  hideBidInput.style.display = "none";
}

createHeader();

// Present the listing in the DOM
async function presentListing(listing) {
  //   const created = listing.created;
  const title = listing.title;
  const description = listing.description;
  const media = listing.media;
  const tags = listing.tags;
  const bids = listing.bids;
  const endsAt = new Date(listing.endsAt).getTime();
  //   const seller = listing.seller;

  // Check if there are images in the media
  if (media && media.length > 0) {
    const carouselIndicators = document.querySelector(".carousel-indicators");
    const carouselInner = document.querySelector(".carousel-inner");

    // Clear existing indicators and inner content
    carouselIndicators.innerHTML = "";
    carouselInner.innerHTML = "";

    // Populate carousel indicators and inner content
    media.forEach((imageUrl, index) => {
      const indicatorButton = document.createElement("button");
      indicatorButton.type = "button";
      indicatorButton.dataset.bsTarget = "#carouselExampleCaptions";
      indicatorButton.dataset.bsSlideTo = index;
      indicatorButton.className = `img-thumbnail ${
        index === 0 ? "active" : ""
      }`;
      indicatorButton.setAttribute("aria-current", index === 0);
      indicatorButton.setAttribute("aria-label", `Slide ${index + 1}`);

      const indicatorImage = document.createElement("img");
      indicatorImage.src = imageUrl;
      indicatorImage.className = "d-block w-100 thumb-image";
      indicatorImage.alt = `Slide ${index + 1}`;

      indicatorButton.appendChild(indicatorImage);
      carouselIndicators.appendChild(indicatorButton);

      const carouselItem = document.createElement("div");
      carouselItem.className = `carousel-item ${index === 0 ? "active" : ""}`;

      const carouselItemImage = document.createElement("img");
      carouselItemImage.src = imageUrl;
      carouselItemImage.className = "d-block w-50";
      carouselItemImage.alt = `Slide ${index + 1}`;

      if (!imageUrl || imageUrl === "") {
        indicatorImage.src = "/images/default/default-post-image.jpg";
      }

      carouselItem.appendChild(carouselItemImage);
      carouselInner.appendChild(carouselItem);
    });
  }

  const infoContainer = document.querySelector(".specific-listing-container");
  infoContainer.innerHTML = "";

  const presentTitle = document.createElement("h5");
  presentTitle.textContent = title;

  const presentTags = document.createElement("p");
  presentTags.textContent = tags;
  if (tags.length === 0) {
    presentTags.textContent = `No tags`;
  }

  const presentHighestBid = document.createElement("p");
  presentHighestBid.classList.add("highest-bid-amount");
  if (bids.length > 0) {
    // Find the highest bid amount
    const highestBidAmount = bids.reduce((maxBid, currentBid) => {
      return currentBid.amount > (maxBid ? maxBid.amount : 0)
        ? currentBid
        : maxBid;
    }, bids[0]);

    presentHighestBid.textContent = `Highest Bid: ${highestBidAmount.amount}`;
  } else {
    presentHighestBid.textContent = "No Bids";
  }

  const timeLeftContainer = document.createElement("div");
  let intervalId; // Declare intervalId here

  // Function to update time left
  function updateTimeLeft() {
    const now = new Date().getTime();
    const timeDiff = endsAt - now;

    if (timeDiff > 0) {
      const seconds = Math.floor((timeDiff / 1000) % 60);
      const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
      const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);

      timeLeftContainer.textContent = `Time Left: ${hours}h ${minutes}m ${seconds}s`;
    } else {
      timeLeftContainer.textContent = "Auction has ended.";
      clearInterval(intervalId); // Stop updating once time is up
    }
  }

  // Initial call to set up the display
  updateTimeLeft();

  // Update time left every second
  intervalId = setInterval(updateTimeLeft, 1000); // Assign to intervalId here

  infoContainer.appendChild(presentTitle);
  infoContainer.appendChild(presentTags);
  infoContainer.appendChild(presentHighestBid);
  infoContainer.appendChild(timeLeftContainer);

  const presentDescription = document.querySelector("#description-text");
  presentDescription.textContent = description;

  // Bidding History
  // If user is logged in
  if (isLoggedIn()) {
    const bidStoryTable = document.querySelector("#bidding-table");
    const tbody = bidStoryTable.querySelector("tbody");

    // Sort bids by amount in descending order
    bids.sort((a, b) => b.amount - a.amount);

    // Create the table header
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    const amountHeader = document.createElement("th");
    amountHeader.textContent = "Amount";
    headerRow.appendChild(amountHeader);

    const bidderNameHeader = document.createElement("th");
    bidderNameHeader.textContent = "Bidder Name";
    headerRow.appendChild(bidderNameHeader);

    thead.appendChild(headerRow);
    bidStoryTable.appendChild(thead);

    const numToShow = 5; // Number of rows to show initially
    let currentShown = 0;

    bids.slice(0, numToShow).forEach((bid) => {
      let bidderName = bid.bidderName;
      let bidAmount = bid.amount;

      // Create a new row for each bid
      const row = document.createElement("tr");

      // Add columns to the row
      const amountCell = document.createElement("td");
      amountCell.textContent = bidAmount;
      row.appendChild(amountCell);

      const bidderNameCell = document.createElement("td");
      bidderNameCell.textContent = bidderName;
      row.appendChild(bidderNameCell);

      // Append the row to the table body
      tbody.appendChild(row);
      currentShown++;
    });

    if (bids.length > numToShow) {
      // Create "Load More" button
      const loadMoreButton = document.createElement("button");
      loadMoreButton.classList.add("btn", "btn-primary");
      loadMoreButton.style.float = "right";
      loadMoreButton.textContent = "Load More";
      loadMoreButton.addEventListener("click", () => {
        bids.slice(currentShown, currentShown + numToShow).forEach((bid) => {
          let bidderName = bid.bidderName;
          let bidAmount = bid.amount;

          // Create a new row for each bid
          const row = document.createElement("tr");

          // Add columns to the row
          const amountCell = document.createElement("td");
          amountCell.textContent = bidAmount;
          row.appendChild(amountCell);

          const bidderNameCell = document.createElement("td");
          bidderNameCell.textContent = bidderName;
          row.appendChild(bidderNameCell);

          // Append the row to the table body
          tbody.appendChild(row);
          currentShown++;
        });

        if (currentShown >= bids.length) {
          // Hide the "Load More" button when all bids are shown
          loadMoreButton.style.display = "none";
        }
      });

      // Append the "Load More" button to the container
      bidStoryTable.parentNode.appendChild(loadMoreButton);
    }
  } else {
    displayMessage(
      "error-message",
      `Only registered users can see bid story on listings`,
      ".unregistered-message",
    );
  }
}

export async function getSpecificListing() {
  try {
    const specificListingURL = `${API_BASE_URL}/auction/listings/${listingId}?_seller=true&_bids=true`;

    const getData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(specificListingURL, getData);
    const json = await response.json();

    const listing = json;

    presentListing(listing);
  } catch (error) {
    console.log(error);
  }
}
getSpecificListing();

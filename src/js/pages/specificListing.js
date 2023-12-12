import { API_BASE_URL } from "../api/baseUrl.js";
import { createHeader } from "../components/header.js";
import { token } from "../utils/storage.mjs";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const listingId = urlParams.get("id");

createHeader();

// Present the listing in the DOM
async function presentListing(listing) {
  //   const created = listing.created;
  const title = listing.title;
  const description = listing.description;
  //   const media = listing.media;
  const tags = listing.tags;
  const bids = listing.bids;
  const endsAt = new Date(listing.endsAt).getTime();
  //   const seller = listing.seller;
  //   let countBids = listing._count.bids;

  const infoContainer = document.querySelector(".specific-listing-container");

  const presentTitle = document.createElement("h5");
  presentTitle.textContent = title;

  const presentTags = document.createElement("p");
  presentTags.textContent = tags;
  if (tags.length === 0) {
    presentTags.textContent = `No tags`;
  }

  const presentHighestBid = document.createElement("p");
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
}

async function getSpecificListing() {
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
    console.log(response);
    const listing = json;
    console.log(listing);

    presentListing(listing);
  } catch (error) {
    console.log(error);
  }
}
getSpecificListing();

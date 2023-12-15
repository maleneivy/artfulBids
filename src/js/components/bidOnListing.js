import { API_BASE_URL } from "../api/baseUrl.js";
import { getSpecificListing } from "../pages/specificListing.js";
import { displayMessage } from "../utils/displayMessage.mjs";
import { token } from "../utils/storage.mjs";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const listingId = urlParams.get("id");

async function addBid(amount) {
  try {
    const url = `${API_BASE_URL}/auction/listings/${listingId}/bids`;

    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount: amount }),
    };

    const response = await fetch(url, postData);
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message || "Bid placement failed");
    }
  } catch (error) {
    throw new Error(`Error placing bid: ${error.message}`);
  }
}

async function placeBid() {
  const bidAmountInput = document.getElementById("bidAmount");
  const amount = parseFloat(bidAmountInput.value);

  if (!isNaN(amount) && amount > 0) {
    try {
      // Check if the entered bid amount is lower than the current highest bid
      const currentHighestBidElement = document.querySelector(
        ".highest-bid-amount",
      );
      const currentHighestBid = parseFloat(
        currentHighestBidElement.textContent.split(":")[1].trim(),
      );

      if (amount <= currentHighestBid) {
        displayMessage(
          "error-message",
          `Your bid must be higher than the current highest bid.`,
          ".bidding-message",
        );
        throw new Error("Invalid bid amount. Please enter a higher bid.");
      }

      await addBid(amount);
      updateUIAfterBid();
    } catch (error) {
      throw new Error(`Error placing bid: ${error.message}`);
    }
  } else {
    throw new Error("Invalid bid amount. Please enter a valid number.");
  }
}

// Ensure the placeBid function is accessible in the HTML
window.placeBid = placeBid;

function updateHighestBid(amount) {
  const highestBidElement = document.querySelector(".highest-bid-amount");
  highestBidElement.textContent = `Highest Bid: ${amount}`;
}

async function updateUIAfterBid() {
  try {
    await getSpecificListing();

    const bidAmountInput = document.getElementById("bidAmount");

    const amount = parseFloat(bidAmountInput.value);
    updateHighestBid(amount);
    displayMessage(
      "success-message",
      "Your bid was successful!",
      ".bidding-message",
    );

    // Remove the success message after 10 seconds
    setTimeout(() => {
      const biddingContainer = document.querySelector(".bidding-message");
      biddingContainer.innerHTML = "";
    }, 10000);

    bidAmountInput.value = "";
  } catch (error) {
    throw new Error(`Error updating UI after bid: ${error.message}`);
  }
}

import { API_BASE_URL } from "../api/baseUrl.js";
import { createHeader } from "../components/header.js";
import { token } from "../utils/storage.mjs";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const listingId = urlParams.get("id");

createHeader();

async function getSpecificListing() {
  try {
    const specificListingURL = `${API_BASE_URL}/auction/listings/${listingId}?_seller=true&?_bids=true
    `;

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
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}
getSpecificListing();

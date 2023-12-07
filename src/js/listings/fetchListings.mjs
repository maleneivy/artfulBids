import { API_BASE_URL } from "../api/baseUrl.js";
import { getAllListingsUrl } from "../api/listings/listingsUrl.js";
import { token } from "../utils/storage.mjs";

const listingsUrl = `${API_BASE_URL}${getAllListingsUrl}`;

export async function fetchListings(tag, bids) {
  try {
    let url = listingsUrl;
    let queryParams = [];

    // Filter by tag, if tag is given.
    if (tag !== null) {
      queryParams.push(`_tag=${tag}`);
    }

    // if there are any bids.
    if (bids !== false) {
      queryParams.push(`_bids=true`);
    }

    url += "?" + queryParams.join("&");

    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, fetchOptions);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

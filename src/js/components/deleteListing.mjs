import { API_BASE_URL } from "../api/baseUrl.js";
import { displayMessage } from "../utils/displayMessage.mjs";
import { token } from "../utils/storage.mjs";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const listingId = urlParams.get("id");
const deleteButton = document.querySelector("#delete-listing-button");

async function deleteListing() {
  const url = `${API_BASE_URL}/auction/listings/${listingId}`;

  const deleteOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id: listingId }),
  };

  try {
    const response = await fetch(url, deleteOptions);

    if (response.ok) {
      window.location.href = "/pages/my-profile.html";
      alert(`Your listing was successfully deleted`);
    } else {
      displayMessage("error-message", `Something went wrong`, ".edit-message");
    }
  } catch (error) {
    throw new Error(error);
  }
}

deleteButton.addEventListener("click", (e) => {
  e.preventDefault();

  deleteListing(listingId);
});

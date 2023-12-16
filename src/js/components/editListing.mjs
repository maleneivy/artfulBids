import { API_BASE_URL } from "../api/baseUrl.js";
import { getSpecificListing } from "../pages/specificListing.js";
import { clearMessages, displayMessage } from "../utils/displayMessage.mjs";
import { token } from "../utils/storage.mjs";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const listingId = urlParams.get("id");
const editFormContainer = document.querySelector("#edit-listing-form");
const saveButton = document.querySelector("#save-listing-button");

// Get values
async function getValues() {
  const getListingValuesURL = `${API_BASE_URL}/auction/listings/${listingId}`;

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(getListingValuesURL, options);
    const json = await response.json();

    const title = document.querySelector("#editTitleInput");
    const description = document.querySelector("#editDescriptionInput");
    const media = document.querySelector("#editAddImageInput");
    const tags = document.querySelector("#editTagsInput");

    title.value = json.title;
    description.value = json.description;
    media.value = json.media;
    tags.value = json.tags;
  } catch (error) {}
}

getValues();

// Edit values
editFormContainer.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTitle = editTitleInput.value;
  const newDescription = editDescriptionInput.value;
  const newMedia = editAddImageInput.value;
  const newTags = editTagsInput.value;

  editListing(newTitle, newDescription, newMedia, newTags);
});

async function editListing(newTitle, newDescription, newMedia, newTags) {
  const putUrl = `${API_BASE_URL}/auction/listings/${listingId}`;

  const putData = JSON.stringify({
    title: newTitle,
    description: newDescription,
    tags: [newTags],
    media: [newMedia],
  });

  const putOptions = {
    method: "PUT",
    body: putData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(putUrl, putOptions);
    const json = await response.json();
    console.log(json);

    if (response.ok) {
      displayMessage(
        "success-message",
        `Your listing was successfully saved`,
        ".edit-message",
      );

      await getSpecificListing();
      saveButton.disabled = true;
    } else {
      displayMessage("error-message", `Something went wrong`, ".edit-message");
    }
  } catch (error) {
    console.log(error);
  }
}

// Close modal event
const closeModalButton = document.querySelector("#closeModalButton");
closeModalButton.addEventListener("click", () => {
  // Reset the form state when the modal is closed
  clearMessages(".edit-message");
  saveButton.disabled = false;
});

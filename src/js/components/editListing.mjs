import { API_BASE_URL } from "../api/baseUrl.js";
import { getSpecificListing } from "../pages/specificListing.js";
import { clearMessages, displayMessage } from "../utils/displayMessage.mjs";
import {
  createAndAppendImageInput,
  insertNewImageInputIfPossible,
} from "../utils/imageInputs.js";
import { token } from "../utils/storage.mjs";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const listingId = urlParams.get("id");
const editFormContainer = document.querySelector("#edit-listing-form");
const saveButton = document.querySelector("#save-listing-button");
const imageInputContainer = document.querySelector("#editImageInputsContainer");
const addImageInputButton = document.querySelector("#addImageInput");

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
    const tags = document.querySelector("#editTagsInput");

    title.value = json.title;
    description.value = json.description;
    tags.value = json.tags;

    if (json.media.length === 0) {
      createAndAppendImageInput("", imageInputContainer);
    } else {
      json.media.forEach((image) => {
        createAndAppendImageInput(image, imageInputContainer);
      });
    }
  } catch (error) {
    throw new Error(json.errors);
  }
}

getValues();

addImageInputButton.addEventListener("click", () => {
  insertNewImageInputIfPossible(imageInputContainer);
});

// Edit values
editFormContainer.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTitle = editTitleInput.value;
  const newDescription = editDescriptionInput.value;
  const newTags = editTagsInput.value;

  // Get an array of image URLs
  const newMedia = Array.from(document.querySelectorAll(".image-input")).map(
    (input) => input.value,
  );

  editListing(newTitle, newDescription, newMedia, newTags);
});

async function editListing(newTitle, newDescription, newMedia, newTags) {
  const putUrl = `${API_BASE_URL}/auction/listings/${listingId}`;

  const putData = JSON.stringify({
    title: newTitle,
    description: newDescription,
    tags: [newTags],
    media: newMedia,
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
    throw new Error(error);
  }
}

// Close modal event
const closeModalButton = document.querySelector("#closeModalButton");
closeModalButton.addEventListener("click", () => {
  // Reset the form state when the modal is closed
  clearMessages(".edit-message");
  saveButton.disabled = false;
});

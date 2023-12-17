import { API_BASE_URL } from "../api/baseUrl.js";
import { getSpecificListing } from "../pages/specificListing.js";
import { clearMessages, displayMessage } from "../utils/displayMessage.mjs";
import { token } from "../utils/storage.mjs";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const listingId = urlParams.get("id");
const editFormContainer = document.querySelector("#edit-listing-form");
const saveButton = document.querySelector("#save-listing-button");
const imageInputContainer = document.querySelector("#editImageInputsContainer");
const addImageInputButton = document.querySelector("#addImageInput");

// Image Input Limit
const maxNumberOfImages = 5;

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
      createAndInsertImageField("", imageInputContainer);
    } else {
      json.media.forEach((image) =>
        createAndInsertImageField(image, imageInputContainer),
      );
    }
  } catch (error) {
    console.log(error);
  }
}

getValues();

addImageInputButton.addEventListener("click", () => {
  // Clear any existing error messages
  clearMessages(".empty-image-message");

  if (!canInsertNewImage()) {
    displayMessage(
      "error-message",
      `You can have max ${maxNumberOfImages} images.`,
      ".empty-image-message",
    );
    return;
  }

  // Check if number of images is within range.
  const imageInputs = document.querySelectorAll(".image-input.form-control");

  // Check if the last image input is empty or if it's not a valid URL
  if (imageInputs.length !== 0) {
    const lastImageValue = imageInputs[imageInputs.length - 1].value.trim();

    if (lastImageValue === "" || !isValidURL(lastImageValue)) {
      // Alert a message if the last input is empty or not a valid URL
      displayMessage(
        "error-message",
        `Please fill in a valid URL in the current image input before adding a new one`,
        ".empty-image-message",
      );
      return;
    }
  }

  createAndInsertImageField("", imageInputContainer);
});

// Function to check if a string is a valid URL
function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

function canInsertNewImage() {
  // Check if number of images is within range.
  const imageInputs = document.querySelectorAll(".image-input.form-control");
  return imageInputs.length < maxNumberOfImages;
}

function createAndInsertImageField(image, container) {
  // Create a new row for image input
  const newRow = document.createElement("div");
  newRow.className = "image-input-row";

  const flexImgContainer = document.createElement("div");
  flexImgContainer.className = "d-flex";

  // Create input for image URL
  const newImageInput = document.createElement("input");
  newImageInput.type = "url";
  newImageInput.className = "image-input form-control";
  newImageInput.value = image;

  // Create delete button for the new image input
  const deleteImageUrlButton = document.createElement("i");
  deleteImageUrlButton.className = "fa-regular fa-trash-can";
  deleteImageUrlButton.id = "delete-image-input";
  deleteImageUrlButton.style.color = "#272c35";
  deleteImageUrlButton.addEventListener("click", () => {
    newRow.remove();
    if (canInsertNewImage()) {
      clearMessages(".empty-image-message");
    }
  });

  // Append the elements to the new row
  newRow.appendChild(flexImgContainer);
  flexImgContainer.appendChild(newImageInput);
  flexImgContainer.appendChild(deleteImageUrlButton);

  // Append the new row to the container
  container.appendChild(newRow);
}

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

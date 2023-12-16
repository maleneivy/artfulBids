import { API_BASE_URL } from "../api/baseUrl.js";
import { getAllListingsUrl } from "../api/listings/listingsUrl.js";
import { token } from "../utils/storage.mjs";
import { createHeader } from "../components/header.js";
import { displayMessage, clearMessages } from "../utils/displayMessage.mjs";
import { createFooter } from "../components/footer.js";

createHeader();
createFooter();

const createListingContainer = document.querySelector("#new-listing-form");
const listingTitle = document.querySelector("#listingTitleInput");
const listingDescription = document.querySelector("#descriptionInput");
const listingTags = document.querySelector("#listingTagsInput");
const deadlineInput = document.querySelector("#listingDeadlineInput");

const messageContainer = document.querySelector(".message");
const goToSpecificListing = document.querySelector("#go-to-listing-by-id");
const saveButton = document.querySelector("#save-listing-button");

// ImageContainer
const imageInputContainer = document.querySelector("#ImageInputsContainer");
const addImageInputButton = document.querySelector("#addImageInput");

// Image Input Limit
const max_image_inputs = 5;

let imageCounter = 1;

addImageInputButton.addEventListener("click", () => {
  // Clear any existing error messages
  clearMessages(".empty-image-message");

  // Check if the last image input is empty or if it's not a valid URL
  const lastImageInput = document.querySelector(`#listingImage${imageCounter}`);
  if (lastImageInput) {
    const lastImageValue = lastImageInput.value.trim();
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

  // Create a new row for image input
  const newRow = document.createElement("div");
  newRow.className = "image-input-row";
  newRow.id = `image-input-row-${imageCounter + 1}`;

  const flexImgContainer = document.createElement("div");
  flexImgContainer.className = "d-flex";

  // Create input for image URL
  const newImageInput = document.createElement("input");
  newImageInput.type = "url";
  newImageInput.className = "image-input form-control";
  newImageInput.id = `listingImage${imageCounter + 1}`;

  // Create delete button for the new image input
  const deleteImageUrlButton = document.createElement("i");
  deleteImageUrlButton.className = "fa-regular fa-trash-can";
  deleteImageUrlButton.id = "delete-image-input";
  deleteImageUrlButton.style.color = "#272c35";
  deleteImageUrlButton.addEventListener("click", () => {
    newRow.remove();
  });

  // Append the elements to the new row
  newRow.appendChild(flexImgContainer);
  flexImgContainer.appendChild(newImageInput);
  flexImgContainer.appendChild(deleteImageUrlButton);

  // Append the new row to the container
  imageInputContainer.appendChild(newRow);

  imageCounter++;
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

createListingContainer.addEventListener("submit", (e) => {
  e.preventDefault();

  const titleValue = listingTitle.value;
  const descriptionValue = listingDescription.value;
  const tagsValue = [listingTags.value];
  const deadlineValue = deadlineInput.value;

  // Get an array of image URLs
  const imageValue = Array.from(document.querySelectorAll(".image-input")).map(
    (input) => input.value,
  );

  if (!deadlineValue) {
    alert(`Please select a deadline`);
    return;
  }

  const deadlineDate = new Date(deadlineValue);
  const formattedDeadline = deadlineDate.toISOString();

  createListing(
    titleValue,
    descriptionValue,
    tagsValue,
    formattedDeadline,
    imageValue,
  );
});

async function createListing(
  titleValue,
  descriptionValue,
  tagsValue,
  formattedDeadline,
  imageValue,
) {
  const createListingURL = `${API_BASE_URL}${getAllListingsUrl}`;

  const listingData = JSON.stringify({
    title: titleValue,
    description: descriptionValue,
    tags: tagsValue,
    endsAt: formattedDeadline,
    media: imageValue,
  });

  const postOptions = {
    method: "POST",
    body: listingData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(createListingURL, postOptions);
    const json = await response.json();
    const jsonErrors = json.errors;
    const listingID = json.id;

    console.log(response);
    console.log(json);
    console.log(listingID);

    if (response.ok) {
      displayMessage(
        "success-message",
        `The post was successfully uploaded`,
        messageContainer,
      );

      createListingContainer.reset();
      saveButton.style.display = "none";
      let listingLink = document.createElement("a");
      listingLink.href = `/html/specific-listing.html?id=${listingID}`;
      listingLink.textContent = "Go to listing";
      goToSpecificListing.appendChild(listingLink);
    } else if (jsonErrors) {
      clearMessages(messageContainer);
      jsonErrors.forEach((errorMessage) => {
        displayMessage(
          "error-message",
          errorMessage.message,
          messageContainer,
          true,
        );
      });
    }
  } catch (error) {
    console.log(error);
    displayMessage("error-message", `Something went wrong`, messageContainer);
  }
}

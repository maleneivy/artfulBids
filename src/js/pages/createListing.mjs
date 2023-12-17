import { API_BASE_URL } from "../api/baseUrl.js";
import { getAllListingsUrl } from "../api/listings/listingsUrl.js";
import { token } from "../utils/storage.mjs";
import { createHeader } from "../components/header.js";
import { displayMessage, clearMessages } from "../utils/displayMessage.mjs";
import { createFooter } from "../components/footer.js";
import { insertNewImageInputIfPossible } from "../utils/imageInputs.js";

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

addImageInputButton.addEventListener("click", () => {
  insertNewImageInputIfPossible(imageInputContainer);
});

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

    if (response.ok) {
      displayMessage(
        "success-message",
        `The post was successfully uploaded`,
        messageContainer,
      );

      createListingContainer.reset();
      saveButton.style.display = "none";
      let listingLink = document.createElement("a");
      listingLink.href = `/pages/specific-listing.html?id=${listingID}`;
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
    displayMessage("error-message", `Something went wrong`, messageContainer);
  }
}

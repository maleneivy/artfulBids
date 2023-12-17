import { clearMessages, displayMessage } from "./displayMessage.mjs";

// Function to check if a string is a valid URL
export function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

export const maxNumberOfImages = 5;

export function canInsertNewImage() {
  // Check if number of images is within range.
  const imageInputs = document.querySelectorAll(".image-input.form-control");
  return imageInputs.length < maxNumberOfImages;
}

export function insertNewImageInputIfPossible(container) {
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

  createAndAppendImageInput("", container);
}

export function createAndAppendImageInput(imageUrl, container) {
  // Create a new row for image input
  const newRow = document.createElement("div");
  newRow.className = "image-input-row";

  const flexImgContainer = document.createElement("div");
  flexImgContainer.className = "d-flex";

  // Create input for image URL
  const newImageInput = document.createElement("input");
  newImageInput.type = "url";
  newImageInput.className = "image-input form-control";
  newImageInput.value = imageUrl;

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

import { clearMessages } from "./displayMessage.mjs";

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

export function createAndInsertImageField(image, container) {
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

export function displayMessage(
  messageType,
  message,
  targetElement,
  shouldAppendMessage,
) {
  const element = document.querySelector(targetElement);

  if (shouldAppendMessage === true) {
    element.innerHTML += `<div class="message ${messageType}">${message}</div>`;
  } else {
    element.innerHTML = `<div class="message ${messageType}">${message}</div>`;
  }
}

/**
 * Clears all displayed messages from a target element.
 *
 * @param {string} targetElement - The selector for the HTML element from which to remove messages.
 */
export function clearMessages(targetElement) {
  const element = document.querySelector(targetElement);
  element.innerHTML = "";
}

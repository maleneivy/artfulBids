export function displayMessage(
  messageType,
  message,
  targetElement,
  shouldAppendMessage,
) {
  const element = document.querySelector(targetElement);

  if (element) {
    if (shouldAppendMessage === true) {
      element.innerHTML += `<div class="message ${messageType}">${message}</div>`;
    } else {
      element.innerHTML = `<div class="message ${messageType}">${message}</div>`;
    }
  }
}

export function clearMessages(targetElement) {
  const element = document.querySelector(targetElement);
  element.innerHTML = "";
}

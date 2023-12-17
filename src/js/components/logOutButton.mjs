import { clearStorage } from "../utils/storage.mjs";

export default function logOutButton() {
  const button = document.querySelector("#log-out-button");

  if (button) {
    button.onclick = function () {
      clearStorage();
      location.href = "../../../index.html";
    };
  }
}

logOutButton();

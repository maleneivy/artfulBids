import { API_BASE_URL } from "../baseUrl.js";
import { displayMessage } from "../../utils/displayMessage.mjs";
import { postRegisterUrl } from "./endpoints.js";

export async function registerUser(url, userData) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    const response = await fetch(url, postData);
    const json = await response.json();
    console.log(response);
    console.log(json);

    const jsonErrors = json.errors;

    if (jsonErrors) {
      jsonErrors.forEach((errorMessage) => {
        displayMessage(
          "error-message",
          errorMessage.message,
          ".message-register",
        );
        console.log(errorMessage.message);
      });
    }
  } catch (error) {
    console.log(error);
  }
}

document
  .getElementById("register-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const userName = document.getElementById("registerName").value;
    const userEmail = document.getElementById("registerEmail").value;
    const userPassword = document.getElementById("createPassword").value;

    const userData = {
      name: userName,
      email: userEmail,
      password: userPassword,
    };

    const registerUserURL = `${API_BASE_URL}${postRegisterUrl}`;
    await registerUser(registerUserURL, userData);
  });

import { API_BASE_URL } from "../baseUrl.js";
import { postLoginUrl } from "./endpoints.js";
import { displayMessage } from "../../utils/displayMessage.mjs";

export async function logInUser(url, userData) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    const response = await fetch(url, postData);

    if (response.ok) {
      const json = await response.json();
      const userEmail = userData.email;
      const accessToken = json.accessToken;
      const userName = json.name;
      const credits = json.credits;
      const avatar = json.avatar;

      console.log(credits);

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("email", userEmail);
      localStorage.setItem("userName", userName);
      localStorage.setItem("credits", credits);
      localStorage.setItem("avatar", avatar);

      window.location.href = "/html/index.html";
    } else {
      displayMessage(
        "error-message",
        "Username or password is wrong",
        ".message-login",
      );
    }
  } catch (error) {
    console.log(error);
  }
}

document
  .getElementById("login-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const userEmail = document.getElementById("logInEmail").value;
    const userPassword = document.getElementById("inputPassword").value;

    const userData = {
      email: userEmail,
      password: userPassword,
    };

    const logInUserURL = `${API_BASE_URL}${postLoginUrl}`;
    await logInUser(logInUserURL, userData);
  });

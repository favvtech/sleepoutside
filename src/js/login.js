import { setLocalStorage, qs } from "./utils.mjs";

const baseURL = import.meta.env.VITE_SERVER_URL;
const form = qs("#login-form");
const message = qs("#form-message");

function showMessage(text, type = "error") {
  message.textContent = text;
  message.className = `form-message ${type}`;
}

async function handleSubmit(event) {
  event.preventDefault();

  const email = form.querySelector("#email").value.trim();
  const password = form.querySelector("#password").value;

  if (!email || !password) {
    showMessage("Please enter your email and password.");
    return;
  }

  try {
    const response = await fetch(`${baseURL}login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok && data.accessToken) {
      // Save the token so other pages can use it
      setLocalStorage("so-token", data.accessToken);
      // Redirect to orders page (or wherever protected)
      window.location.href = "/orders/index.html";
    } else {
      showMessage(data.message || "Invalid email or password.");
    }
  } catch (err) {
    showMessage("Login failed. Please try again later.");
  }
}

form.addEventListener("submit", handleSubmit);

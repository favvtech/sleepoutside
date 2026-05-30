import { getLocalStorage, setLocalStorage, qs } from "./utils.mjs";

const form = qs("#register-form");
const message = qs("#form-message");
const storageKey = "so-customers";

function getCustomers() {
  const stored = getLocalStorage(storageKey);
  return Array.isArray(stored) ? stored : stored ? [stored] : [];
}

function saveCustomers(customers) {
  setLocalStorage(storageKey, customers);
}

function showMessage(text, type = "error") {
  message.textContent = text;
  message.className = `form-message ${type}`;
}

function clearMessage() {
  message.textContent = "";
  message.className = "form-message hide";
}

function isEmailValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function handleSubmit(event) {
  event.preventDefault();
  clearMessage();

  const firstName = form.querySelector("#first-name").value.trim();
  const lastName = form.querySelector("#last-name").value.trim();
  const email = form.querySelector("#email").value.trim().toLowerCase();
  const password = form.querySelector("#password").value;
  const confirmPassword = form.querySelector("#confirm-password").value;

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    showMessage("Please complete every field before registering.");
    return;
  }

  if (!isEmailValid(email)) {
    showMessage("Please use a valid email address.");
    return;
  }

  if (password.length < 6) {
    showMessage("Password must be at least 6 characters.");
    return;
  }

  if (password !== confirmPassword) {
    showMessage("Passwords do not match.");
    return;
  }

  const customers = getCustomers();
  const existing = customers.find((customer) => customer.email === email);

  if (existing) {
    showMessage("An account already exists for that email address.");
    return;
  }

  const newCustomer = {
    id: Date.now(),
    firstName,
    lastName,
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  customers.push(newCustomer);
  saveCustomers(customers);

  showMessage("Registration successful! You may now sign in.", "success");
  form.reset();
}

form.addEventListener("submit", handleSubmit);

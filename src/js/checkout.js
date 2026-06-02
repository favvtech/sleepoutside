import { clearLocalStorage, getCartItems, qs } from "./utils.mjs";

const form = qs("#checkout-form");
const message = qs("#checkout-message");
const summary = qs("#checkout-summary");
const submitButton = form?.querySelector("button[type=submit]");

function showMessage(text, type = "error") {
  if (!message) {
    return;
  }

  message.textContent = text;
  message.className = `form-message ${type}`;
}

function clearMessage() {
  if (!message) {
    return;
  }

  message.textContent = "";
  message.className = "form-message hide";
}

function isEmailValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isPostalCodeValid(value) {
  return /^[A-Za-z0-9 \-]{4,10}$/.test(value.trim());
}

function isCardNumberValid(value) {
  const digits = value.replace(/\D/g, "");
  return /^[0-9]{13,19}$/.test(digits);
}

function isExpiryValid(value) {
  const expiry = value.trim();
  const match = /^([01]?[0-9])\s*\/\s*((?:[0-9]{2})|(?:[0-9]{4}))$/.exec(expiry);
  if (!match) {
    return false;
  }

  const month = Number(match[1]);
  const year = Number(match[2].length === 2 ? `20${match[2]}` : match[2]);
  if (month < 1 || month > 12) {
    return false;
  }

  const now = new Date();
  const expiryDate = new Date(year, month - 1, 1);
  expiryDate.setMonth(expiryDate.getMonth() + 1);
  return expiryDate > now;
}

function isCvcValid(value) {
  return /^[0-9]{3,4}$/.test(value.trim());
}

function getFormValues() {
  return {
    firstName: form.querySelector("#first-name").value.trim(),
    lastName: form.querySelector("#last-name").value.trim(),
    email: form.querySelector("#email").value.trim(),
    address: form.querySelector("#address").value.trim(),
    city: form.querySelector("#city").value.trim(),
    state: form.querySelector("#state").value.trim(),
    postalCode: form.querySelector("#postal-code").value.trim(),
    country: form.querySelector("#country").value.trim(),
    cardName: form.querySelector("#card-name").value.trim(),
    cardNumber: form.querySelector("#card-number").value.trim(),
    expiry: form.querySelector("#expiry").value.trim(),
    cvc: form.querySelector("#cvc").value.trim(),
  };
}

function validateFields(values, cartItems) {
  if (cartItems.length === 0) {
    return "Your cart is empty. Please add items before checking out.";
  }

  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "address",
    "city",
    "state",
    "postalCode",
    "country",
    "cardName",
    "cardNumber",
    "expiry",
    "cvc",
  ];

  for (const field of requiredFields) {
    if (!values[field]) {
      return "Please complete all required fields before placing your order.";
    }
  }

  if (!isEmailValid(values.email)) {
    return "Please use a valid email address.";
  }

  if (!isPostalCodeValid(values.postalCode)) {
    return "Please enter a valid postal code.";
  }

  if (!isCardNumberValid(values.cardNumber)) {
    return "Please enter a valid card number.";
  }

  if (!isExpiryValid(values.expiry)) {
    return "Please enter a valid expiration date in MM/YY format.";
  }

  if (!isCvcValid(values.cvc)) {
    return "Please enter a valid 3- or 4-digit security code.";
  }

  return null;
}

function renderSummary() {
  const cartItems = getCartItems();
  const total = cartItems.reduce(
    (sum, item) => sum + (Number(item.FinalPrice) || 0) * (Number(item.Quantity) || 1),
    0,
  );

  if (!summary) {
    return;
  }

  if (cartItems.length === 0) {
    summary.innerHTML = "<p>Your cart is empty.</p>";
    submitButton?.setAttribute("disabled", "disabled");
    return;
  }

  summary.innerHTML = `
    <p>You have ${cartItems.length} item(s) in your cart.</p>
    <p><strong>Total:</strong> $${total.toFixed(2)}</p>
  `;
  submitButton?.removeAttribute("disabled");
}

function handleSubmit(event) {
  event.preventDefault();
  clearMessage();

  const cartItems = getCartItems();
  const values = getFormValues();
  const validationError = validateFields(values, cartItems);

  if (validationError) {
    showMessage(validationError, "error");
    return;
  }

  try {
    clearLocalStorage("so-cart");
    renderSummary();
    showMessage("Order placed successfully! Thank you for your purchase.", "success");
    form.reset();
  } catch (error) {
    console.error("Checkout error:", error);
    showMessage(
      "Unable to complete checkout at this time. Please try again later.",
      "error",
    );
  }
}

renderSummary();
form?.addEventListener("submit", handleSubmit);

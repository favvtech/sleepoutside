import CheckoutProcess from "./CheckoutProcess.mjs";
import {
  getCurrentCustomer,
  LoadHeaderFooter,
} from "./utils.mjs";

LoadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", ".order-summary");
const form = document.forms.checkout;
const zipCode = document.querySelector("#zipCode");
const cardNumber = document.querySelector("#cardNumber");

checkout.init();

function requireLoggedInCustomer() {
  if (getCurrentCustomer()) {
    form?.removeAttribute("hidden");
    return true;
  }

  form?.setAttribute("hidden", "");
  window.location.replace("/cart/index.html?checkout=login-required");
  return false;
}

function validateCardNumber() {
  if (!cardNumber) {
    return true;
  }

  const digits = cardNumber.value.replace(/\D/g, "");
  const isValid = digits.length === 16;
  cardNumber.setCustomValidity(
    isValid ? "" : "Please enter a 16-digit card number.",
  );
  return isValid;
}

requireLoggedInCustomer();

if (cardNumber) {
  cardNumber.addEventListener("input", validateCardNumber);
}

if (zipCode) {
  zipCode.addEventListener("change", () => {
    checkout.calculateOrderTotal();
  });
}

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!requireLoggedInCustomer()) {
      return;
    }

    validateCardNumber();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    await checkout.checkout(form);
  });
}

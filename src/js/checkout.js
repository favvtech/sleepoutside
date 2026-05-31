import CheckoutProcess from "./CheckoutProcess.mjs";
import { LoadHeaderFooter } from "./utils.mjs";

LoadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", ".order-summary");
const form = document.forms.checkout;
const zipCode = document.querySelector("#zipCode");

checkout.init();

if (zipCode) {
  zipCode.addEventListener("change", () => {
    checkout.calculateOrderTotal();
  });
}

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("Form submit intercepted!");  // TODO DEBUG
    const result = await checkout.checkout(form);  // TODO DEBUG
    console.log("Server response:", result);  // TODO DEBUG
    await checkout.checkout(form);
    form.reset();
  });
}

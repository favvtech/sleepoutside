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
    try {
      const result = await checkout.checkout(form);
      console.log("Server response:", result);  // TODO DEBUG
      // Success - order was placed so reset the form
      alert(`Your order was successfully placed`)
      form.reset();
      window.location.href = "/checkout/success.html";
    } catch (error) {
      // The order was not accepted
      console.error("Checkout error: ", error);
      alert(`Checkout failed: ${Object.values(error.message)[0]}`);
    }
  });
}

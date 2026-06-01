import ExternalServices from "./ExternalServices.mjs";
import { clearLocalStorage, getLocalStorage, updateCartCount } from "./utils.mjs";

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemSubtotal = 0;
    this.itemCount = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    this.services = new ExternalServices();
  }

  init() {
    // const storedCart = getLocalStorage(this.key);
    // this.list = Array.isArray(storedCart)
    //   ? storedCart
    //   : storedCart
    //     ? [storedCart]
    //     : [];
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSubtotal();
  }

  calculateItemSubtotal() {
    this.itemSubtotal = this.list.reduce(
      (total, item) =>
        total + (Number(item.FinalPrice) || 0) * (Number(item.Quantity) || 1),
      0,
    );
    this.itemCount = this.list.reduce(
      (total, item) => total + (Number(item.Quantity) || 1),
      0,
    );

    this.displayOrderTotals();
  }

  calculateOrderTotal() {
    this.tax = this.itemSubtotal * 0.06;
    this.shipping = this.itemCount > 0 ? 10 + (this.itemCount - 1) * 2 : 0;
    this.orderTotal = this.itemSubtotal + this.tax + this.shipping;
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const numItems = document.querySelector(`${this.outputSelector} #num-items`);
    if (numItems) numItems.textContent = this.itemCount;

    this.setSummaryText("cartTotal", this.itemSubtotal);
    this.setSummaryText("tax", this.tax);
    this.setSummaryText("shipping", this.shipping);
    this.setSummaryText("orderTotal", this.orderTotal);
  }

  setSummaryText(id, amount) {
    const element = document.querySelector(`${this.outputSelector} #${id}`);
    if (element) {
      element.textContent = `$${amount.toFixed(2)}`;
    }
  }

  packageItems(items) {
    return items.map((item) => ({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: Number(item.Quantity) || 1,
    }));
  }

  formDataToJSON(form) {
    const formData = new FormData(form);
    return Object.fromEntries(formData.entries());
  }

  async checkout(form) {
    const order = this.formDataToJSON(form);
    // convert from yyyy-mm to m/yy
    // if (order.expiration) {
    //   const [year, month] = order.expiration.split("-");
    //   order.expiration = `${parseInt(month)}/${year.slice(2)}`;
    // }
    this.calculateOrderTotal();

    // const payload = {
      // fname: formData.firstName,
      // lname: formData.lastName,
      // street: formData.streetAddress,
      // city: formData.city,
      // state: formData.state,
      // zip: formData.zipCode,
      // cardNumber: formData.cardNumber,
      // expiration: formData.expirationDate,
    // code: formData.securityCode,
    order.orderDate = new Date().toISOString();
    order.items = this.packageItems(this.list);
    order.orderTotal = this.orderTotal.toFixed(2);
    order.shipping = this.shipping;
    order.tax = this.tax.toFixed(2);
    order.cardNumber = order.cardNumber.replace(/\s/g, "");  
    // };

    console.log("Order being sent:", order);  // TODO: DEBUG

    try {
      const response = await this.services.checkout(order);
      clearLocalStorage(this.key);
      updateCartCount();
      return response;
    } catch (error) {
      console.error("Checkout error: ", error);
      throw error;
    }
  }
}
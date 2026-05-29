export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = so-cart;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0.06;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.itemTotal = this.list.length;
    this.shipping = (this.itemTotal - 1) * 2 + 10;
    this.calculateItemSummary();
  }

    // calculate and display the total dollar amount of the items in the cart, and the number of items.
  calculateItemSubTotal() {

    
  }

    // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
  calculateOrderTotal() {
    this.tax = (this.itemTotal * this.tax);
    this.shipping = (this.itemTotal - 1) * 2 + 10;
    this.orderTotal =

    // display the totals.
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    const tax = document.querySelector(`${this.outputSelector} #tax`);

    tax.innerText = `$${this.tax.toFixed(2)}`;
  }
}
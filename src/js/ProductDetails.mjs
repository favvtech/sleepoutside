import {
  getDiscountAmount,
  getImageUrl,
  getLocalStorage,
  isDiscounted,
  setLocalStorage,
} from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const storedCart = getLocalStorage("so-cart");
    const cart = Array.isArray(storedCart)
      ? storedCart
      : storedCart
        ? [storedCart]
        : [];
    cart.push(this.product);
    setLocalStorage("so-cart", cart);
  }

  renderProductDetails() {
    const { product } = this;

    document.querySelector(".product-detail h3").textContent =
      product.Brand.Name;
    document.querySelector(".product-detail h2").textContent =
      product.NameWithoutBrand;

    const img = document.querySelector(".product-detail img");
    img.src = getImageUrl(product.Image);
    img.alt = product.NameWithoutBrand;

    document.querySelector(".product-card__price").textContent =
      `$${product.FinalPrice.toFixed(2)}`;

    const discountEl = document.querySelector(".product-discount");
    if (isDiscounted(product)) {
      const savings = getDiscountAmount(product);
      discountEl.textContent = `Save $${savings.toFixed(2)} (Retail: $${product.SuggestedRetailPrice.toFixed(2)})`;
      discountEl.classList.remove("hide");
    } else {
      discountEl.textContent = "";
      discountEl.classList.add("hide");
    }

    document.querySelector(".product__color").textContent =
      product.Colors[0].ColorName;
    document.querySelector(".product__description").innerHTML =
      product.DescriptionHtmlSimple;

    document.getElementById("addToCart").dataset.id = product.Id;
    document.title = `Sleep Outside | ${product.Name}`;
  }
}

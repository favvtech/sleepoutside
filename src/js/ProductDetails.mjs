import {
  getDiscountAmount,
  getImageUrl,
  getLocalStorage,
  isDiscounted,
  setLocalStorage,
  alertMessage,
  updateCartCount,
  animateCartIcon, // Backlog 3 - Animate cart (backpack) icon when item added to cart - CEC
} from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource, category) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    this.category = category;
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
    const cartItem = cart.find((item) => item.Id === this.product.Id);

    if (cartItem) {
      cartItem.Quantity = (Number(cartItem.Quantity) || 1) + 1;
    } else {
      cart.push({ ...this.product, Quantity: 1 });
    }

    setLocalStorage("so-cart", cart);
    updateCartCount();
    animateCartIcon(); // Backlog 3 - Animate cart (backpack) icon when item added to cart - CEC
    alertMessage(`${this.product.Name} was added to the cart.`, false);
  }

  renderProductDetails() {
    const { product } = this;

    document.querySelector(".product-detail h3").textContent =
      product.Brand.Name;
    document.querySelector(".product-detail h2").textContent =
      product.NameWithoutBrand;

    const img = document.querySelector(".product-detail img");
    img.src = getImageUrl(product.Images.PrimaryLarge);
    img.srcset = [
      `${getImageUrl(product.Images.PrimaryMedium)} 160w`,
      `${getImageUrl(product.Images.PrimaryLarge)} 320w`,
      `${getImageUrl(product.Images.PrimaryExtraLarge)} 600w`,
    ].join(", ");
    img.sizes = "(min-width: 700px) 500px, 100vw";
    img.alt = product.NameWithoutBrand;

    const retailEl = document.querySelector(".product-card__price--retail");
    const priceEl = document.querySelector(".product-card__price");
    const discountEl = document.querySelector(".product-discount");
    const discountFlagEl = document.querySelector(".product-discount-flag");
    const breadcrumbs = document.querySelector(".breadcrumbs");

    if (breadcrumbs) {
      const category = this.category || product.Category;
      breadcrumbs.textContent = category
        .split("-")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");
    }

    priceEl.textContent = `$${product.FinalPrice.toFixed(2)}`;

    if (isDiscounted(product)) {
      const savings = getDiscountAmount(product);
      retailEl.textContent = `$${product.SuggestedRetailPrice.toFixed(2)}`;
      retailEl.classList.remove("hide");
      discountEl.textContent = `Save $${savings.toFixed(2)}`;
      discountEl.classList.remove("hide");
      discountFlagEl.textContent = `-$${savings.toFixed(2)}`;
      discountFlagEl.classList.remove("hide");
    } else {
      retailEl.textContent = "";
      retailEl.classList.add("hide");
      discountEl.textContent = "";
      discountEl.classList.add("hide");
      discountFlagEl.textContent = "";
      discountFlagEl.classList.add("hide");
    }

    document.querySelector(".product__color").textContent =
      product.Colors[0].ColorName;
    document.querySelector(".product__description").innerHTML =
      product.DescriptionHtmlSimple;

    document.getElementById("addToCart").dataset.id = product.Id;
    document.title = `Sleep Outside | ${product.Name}`;
  }
}

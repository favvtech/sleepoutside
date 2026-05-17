import { getImageUrl, getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const storedCart = getLocalStorage("so-cart");
  const cartItems = Array.isArray(storedCart)
    ? storedCart
    : storedCart
      ? [storedCart]
      : [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
  <a href="product_pages/?product=${item.Id}" class="cart-card__image">
    <img
      src="${getImageUrl(item.Image)}"
      alt="${item.Name}"
    />
  </a>
  <a href="product_pages/?product=${item.Id}">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice.toFixed(2)}</p>
</li>`;
}

renderCartContents();

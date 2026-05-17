import { getImageUrl, getLocalStorage } from "./utils.mjs";

function getCartItems() {
  const storedCart = getLocalStorage("so-cart");
  return Array.isArray(storedCart)
    ? storedCart
    : storedCart
      ? [storedCart]
      : [];
}

function getItemPrice(item) {
  return Number(item.FinalPrice) || 0;
}

function renderCartContents() {
  const cartItems = getCartItems();
  const listEl = document.querySelector(".product-list");

  if (cartItems.length === 0) {
    listEl.innerHTML = "";
  } else {
    listEl.innerHTML = cartItems.map((item) => cartItemTemplate(item)).join("");
  }

  renderCartTotal(cartItems);
}

function renderCartTotal(cartItems) {
  const footer = document.querySelector(".cart-footer");
  const totalEl = document.querySelector(".cart-total");

  if (!footer || !totalEl) {
    return;
  }

  if (cartItems.length === 0) {
    footer.classList.add("hide");
    totalEl.textContent = "Total: ";
    return;
  }

  const total = cartItems.reduce((sum, item) => sum + getItemPrice(item), 0);
  footer.classList.remove("hide");
  totalEl.textContent = `Total: $${total.toFixed(2)}`;
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
  <a href="/product_pages/?product=${item.Id}" class="cart-card__image">
    <img
      src="${getImageUrl(item.Image)}"
      alt="${item.Name}"
    />
  </a>
  <a href="/product_pages/?product=${item.Id}">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${getItemPrice(item).toFixed(2)}</p>
</li>`;
}

renderCartContents();

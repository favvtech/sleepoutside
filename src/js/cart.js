import { getImageUrl, getLocalStorage, setLocalStorage } from "./utils.mjs";

function getCartItems() {
  const storedCart = getLocalStorage("so-cart");
  if (!storedCart) {
    return [];
  }
  const items = Array.isArray(storedCart) ? storedCart : [storedCart];
  return items.filter(
    (item) =>
      item &&
      typeof item === "object" &&
      item.Id &&
      Array.isArray(item.Colors) &&
      item.Colors.length > 0,
  );
}

function getItemPrice(item) {
  return Number(item.FinalPrice) || 0;
}

function removeFromCart(event) {
    const productId = event.target.dataset.id;
    const cart = getCartItems();
    const indexToRemove = cart.findIndex((item) => item.Id === productId);
    if (indexToRemove !== -1) {
        cart.splice(indexToRemove, 1);
    }
    setLocalStorage("so-cart", cart);
    renderCartContents();
}

function renderCartContents() {
  const cartItems = getCartItems();
  const listEl = document.querySelector(".product-list");
  if (!listEl) {
    return;
  }
  if (cartItems.length === 0) {
    listEl.innerHTML = "";
  } else {
    listEl.innerHTML = cartItems.map((item) => cartItemTemplate(item)).join("");
  }
  document.querySelectorAll(".cart-card__remove").forEach((button) => {
      button.addEventListener("click", removeFromCart);
  });
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
  const colorName = item.Colors[0]?.ColorName ?? "";
  return `<li class="cart-card divider">
  <a href="/product_pages/?product=${item.Id}" class="cart-card__image">
    <img
      src="${getImageUrl(item.Image)}"
      alt="${item.Name ?? "Cart item"}"
    />
  </a>
  <a href="/product_pages/?product=${item.Id}">
    <h2 class="card__name">${item.Name ?? ""}</h2>
  </a>
  <p class="cart-card__color">${colorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${getItemPrice(item).toFixed(2)}</p>
  <button class="cart-card__remove" data-id="${item.Id}">X</button>
</li>`;
}

renderCartContents();

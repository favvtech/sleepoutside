export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function isDiscounted(product) {
  return product.FinalPrice < product.SuggestedRetailPrice;
}

export function getDiscountAmount(product) {
  return product.SuggestedRetailPrice - product.FinalPrice;
}

export function getListingPriceHtml(product) {
  if (isDiscounted(product)) {
    return `<div class="product-pricing">
      <p class="product-card__price--retail">$${product.SuggestedRetailPrice.toFixed(2)}</p>
      <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
    </div>`;
  }
  return `<p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>`;
}

export function getImageUrl(path) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.replace(/^(\.\.\/)+/, "").replace(/^\//, "");
  return `/${normalized}`;
}

export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

let previousCartCount = null;

export function getLocalStorage(key) {
  const rawValue = localStorage.getItem(key);
  if (!rawValue) {
    return null;
  }
  try {
    return JSON.parse(rawValue);
  } catch (error) {
    console.warn(`Unable to parse localStorage value for ${key}:`, error);
    return null;
  }
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function clearLocalStorage(key) {
  localStorage.removeItem(key);
}

export function normalizeCartItems(cart) {
  if (!cart) {
    return [];
  }

  const items = Array.isArray(cart) ? cart : [cart];
  const normalized = new Map();

  for (const item of items) {
    if (!item || typeof item !== "object" || !item.Id) {
      continue;
    }

    const id = String(item.Id);
    const quantity = Number(item.Quantity) || 1;
    const existingItem = normalized.get(id);

    if (existingItem) {
      existingItem.Quantity = (Number(existingItem.Quantity) || 1) + quantity;
    } else {
      normalized.set(id, { ...item, Quantity: quantity });
    }
  }

  return [...normalized.values()];
}

export function getCartItems() {
  const storedCart = getLocalStorage("so-cart");
  return normalizeCartItems(storedCart);
}

export function setCartItems(cart) {
  const cartArray = Array.isArray(cart) ? cart : [cart];
  setLocalStorage("so-cart", normalizeCartItems(cartArray));
}

export function getCartCount() {
  const cartItems = getCartItems();

  return cartItems.reduce(
    (total, item) => total + (Number(item.Quantity) || 1),
    0,
  );
}

export function updateCartCount() {
  const cartCount = document.querySelector(".cart-count");
  const cartWrapper = document.querySelector(".cart");
  if (!cartCount) {
    return;
  }

  const count = getCartCount();
  cartCount.textContent = count;
  cartCount.classList.toggle("hide", count === 0);

  if (previousCartCount !== null && count > previousCartCount && cartWrapper) {
    cartWrapper.classList.add("cart-added");
    cartWrapper.addEventListener(
      "animationend",
      () => cartWrapper.classList.remove("cart-added"),
      { once: true },
    );
  }

  previousCartCount = count;
}

export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  const htmlStrings = list.map(templateFn);

  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(
  template,
  parentElement,
  data,
  callback,
) {
  parentElement.innerHTML = template;
  if(callback) {
    callback(data);
  }

  /*const htmlStrings = list.map(templateFn);

  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));*/
}

export async function loadTemplate(path) {
    const res = await fetch(path);
    const template = await res.text();
    return template;
}

export async function LoadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#header");
  renderWithTemplate(headerTemplate, headerElement);
  updateCartCount();

  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#footer");
  renderWithTemplate(footerTemplate, footerElement);
}
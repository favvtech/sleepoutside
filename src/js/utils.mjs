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

export function getCartCount() {
  const storedCart = getLocalStorage("so-cart");
  const cartItems = Array.isArray(storedCart)
    ? storedCart
    : storedCart
      ? [storedCart]
      : [];

  return cartItems.reduce(
    (total, item) => total + (Number(item.Quantity) || 1),
    0,
  );
}

export function updateCartCount() {
  const cartCount = document.querySelector(".cart-count");
  if (!cartCount) {
    return;
  }

  const count = getCartCount();
  cartCount.textContent = count;
  cartCount.classList.toggle("hide", count === 0);
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

/* Backlog 3 - Animate cart (backpack) icon when item added to cart */
/* Added by Cliff Cummings */
export function animateCartIcon() {
  const cart = document.querySelector(".cart");
  if (!cart) return;
  cart.classList.remove("cart-animate");
  cart.classList.add("cart-animate");
  cart.addEventListener("animationend", () => {
    cart.classList.remove("cart-animate");
  }, { once: true });
}

export function showRegisterBanner() {
  // Only show if they haven't seen it before
  if (localStorage.getItem("registerBannerSeen")) {
    return;
  }

  // Create the banner element
  const banner = document.createElement("div");
  banner.classList.add("register-banner");
  banner.innerHTML = `
    <p>Register today for a chance to win a free tent!</p>
    <div class="register-banner__buttons">
      <a href="/register/index.html">
        <button type="button" class="register-banner__register">Register Now</button>
      </a>
      <button type="button" class="register-banner__dismiss">No Thanks</button>
      <button type="button" class="register-banner__close">✕</button>
    </div>
  `;

  // Add click listeners for all three buttons
  banner.querySelector(".register-banner__close").addEventListener("click", () => {
    dismissBanner(banner);
  });

  banner.querySelector(".register-banner__dismiss").addEventListener("click", () => {
    dismissBanner(banner);
  });

  banner.querySelector(".register-banner__register").addEventListener("click", () => {
    dismissBanner(banner);
  });

  // Insert at the top of main
  const main = document.querySelector("main");
  if (main) {
    main.prepend(banner);
  }
}

function dismissBanner(banner) {
  // Remember that they have seen it
  localStorage.setItem("registerBannerSeen", "true");
  banner.remove();
}
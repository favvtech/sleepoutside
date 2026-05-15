// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  const rawValue = localStorage.getItem(key);
  if (!rawValue) {
    return null;
  }
  try {
    return JSON.parse(rawValue);
  } catch (error) {
    return null;
  }
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

/**
 * getParam — reads a single named parameter from the current page URL.
 *
 * Example URL:  product_pages/index.html?product=880RR
 * Usage:        getParam('product')  →  '880RR'
 *
 * window.location.search gives us the query string (everything after "?").
 * URLSearchParams turns that string into a convenient key/value map.
 * .get(param) looks up and returns the value for the requested key.
 */
export function getParam(param) {
  const queryString = window.location.search;   // e.g. "?product=880RR"
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);                  // e.g. "880RR"
}

// Update the cart item count badge on the backpack icon
export const updateCartCount = () => {
  const cart = getLocalStorage("so-cart") || [];
  const count = cart.length;
  const cartEl = document.querySelector(".cart");
  if (!cartEl) return;

  // Remove existing badge if there is one
  const existing = cartEl.querySelector(".cart-count");
  if (existing) existing.remove();

  // Only show badge if there are items
  if (count > 0) {
    const badge = document.createElement("span");
    badge.classList.add("cart-count");
    badge.textContent = count;
    cartEl.appendChild(badge);
  }
};

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
    if (clear) {
        parentElement.innerHTML = "";
    }
    const htmlStrings = list.map(templateFn);
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

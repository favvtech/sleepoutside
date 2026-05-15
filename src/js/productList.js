import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// Render product list dynamically on homepage
async function renderProductList() {
  const products = await dataSource.getData();
  const list = document.getElementById("product-list");

  products.forEach(product => {
    const li = document.createElement("li");
    li.classList.add("product-card");

    li.innerHTML = `
      <a href="product.html?id=${product.Id}">
        <img src="${product.Image}" alt="${product.NameWithoutBrand}" />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
      <button class="add-to-cart" data-id="${product.Id}">Add to Cart</button>
    `;

    list.appendChild(li);
  });

  // Attach event listeners to all Add to Cart buttons
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", addToCartHandler);
  });
}

// Add product to cart
function addProductToCart(product) {
  const storedCart = getLocalStorage("so-cart");
  const cart = Array.isArray(storedCart)
    ? storedCart
    : storedCart
      ? [storedCart]
      : [];
  cart.push(product);
  setLocalStorage("so-cart", cart);
}

// Add to cart button event handler
async function addToCartHandler(e) {
  e.preventDefault(); // prevent link navigation if inside <a>
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// Initialize homepage product list
renderProductList();

import { setLocalStorage, getLocalStorage } from "./utils.mjs";

/**
 * ProductDetails — manages fetching and rendering a single product page.
 *
 * This class follows the same pattern as ProductData.mjs: all public-facing
 * logic lives inside a class, and the class is the default export so it is
 * easy to import and instantiate wherever it is needed.
 */
export default class ProductDetails {
  /**
   * constructor — called automatically when "new ProductDetails(...)" runs.
   *
   * @param {string}      productId  - the ID read from the URL parameter
   * @param {ProductData} dataSource - an instance of ProductData used to fetch product info
   *
   * We store both values on "this" so every method in the class can access them.
   * this.product starts as an empty object and is filled in once init() fetches the data.
   */
  constructor(productId, dataSource) {
    this.productId = productId;   // e.g. "880RR"
    this.product = {};            // will hold the full product object after init()
    this.dataSource = dataSource; // ProductData instance — knows how to fetch JSON
  }

  /**
   * init — async setup method called after the class is constructed.
   *
   * We cannot use async in a constructor, so tasks that need to wait on
   * promises are placed here instead. Call this once right after creating
   * a new ProductDetails instance.
   *
   * Steps:
   *  1. Fetch the product data matching this.productId from the data source.
   *  2. Render the product HTML onto the page.
   *  3. Attach the "Add to Cart" click listener AFTER the HTML exists in the DOM.
   */
  async init() {
    // findProductById returns a Promise, so we await it before continuing.
    // Once resolved, this.product holds the full product object from the JSON file.
    this.product = await this.dataSource.findProductById(this.productId);

    // Now that we have the data, we can build and insert the HTML.
    this.renderProductDetails();

    // The "Add to Cart" button now exists in the DOM (renderProductDetails put it there),
    // so we can safely attach the click listener.
    // .bind(this) is required — without it, "this" inside addProductToCart would be
    // the button element (the event target) rather than the ProductDetails instance,
    // which means this.product would be undefined.
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  /**
   * addProductToCart — saves the current product to the cart in localStorage.
   *
   * Moved here from product.js so that all product-page logic lives in one place.
   * The cart is stored as a JSON array under the key "so-cart".
   * We retrieve the existing array (or start a new one), push this product onto it,
   * and save it back.
   */
  addProductToCart() {
    // Get the existing cart array, defaulting to [] if nothing is stored yet
    const cart = getLocalStorage("so-cart") || [];

    // Add the current product object to the cart array
    cart.push(this.product);

    // Save the updated array back to localStorage as a JSON string
    setLocalStorage("so-cart", cart);

    // Optional feedback so the user knows the action worked
    alert(`${this.product.Name} has been added to your cart!`);
  }

  /**
   * renderProductDetails — builds the product HTML and inserts it into the page.
   *
   * We use a template literal to construct the HTML string, then set the
   * innerHTML of the <main> element to that string.
   * This mirrors the static HTML structure found in the original product pages
   * so the same CSS styles continue to apply correctly.
   *
   * Note: DescriptionHtmlSimple may contain HTML entities (e.g. &#39;),
   * so we insert it with innerHTML rather than textContent to let the browser
   * decode those entities properly.
   */
  renderProductDetails() {
    // Destructure the product fields we need for cleaner template code
    const {
      Brand,
      NameWithoutBrand,
      Image,
      FinalPrice,
      Colors,
      DescriptionHtmlSimple,
      Id,
    } = this.product;

    // Build the HTML string using the same structure as the static product pages
    const productHTML = `
      <section class="product-detail">

        <!-- Brand name displayed as a small heading above the product title -->
        <h3>${Brand.Name}</h3>

        <!-- Product name without the brand prefix, styled with a divider -->
        <h2 class="divider">${NameWithoutBrand}</h2>

        <!-- Product image — src and alt come from the JSON data -->
        <img
          class="divider"
          src="${Image}"
          alt="${Brand.Name} ${NameWithoutBrand}"
        />

        <!-- Final (sale) price formatted to two decimal places -->
        <p class="product-card__price">$${FinalPrice.toFixed(2)}</p>

        <!-- First available color name -->
        <p class="product__color">${Colors[0].ColorName}</p>

        <!-- Description — uses innerHTML so HTML entities are decoded correctly -->
        <p class="product__description">${DescriptionHtmlSimple}</p>

        <!-- Add to Cart button — data-id stores the product ID for reference -->
        <div class="product-detail__add">
          <button id="addToCart" data-id="${Id}">Add to Cart</button>
        </div>

      </section>
    `;

    // Insert the built HTML into the <main> element on the page
    document.querySelector("main").innerHTML = productHTML;
  }
}

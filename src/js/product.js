/**
 * product.js — entry point for the product detail page.
 *
 * This file is intentionally kept thin. Its only job is to:
 *  1. Read the product ID from the URL.
 *  2. Create the data source and the ProductDetails instance.
 *  3. Call init() to kick everything off.
 *
 * All the real logic (fetching, rendering, adding to cart) lives in the
 * ProductDetails class, which keeps this file easy to read and maintain.
 */

// getParam is a utility that reads a named value from the URL query string.
// e.g.  product_pages/index.html?product=880RR  →  getParam('product') = '880RR'
import { getParam } from "./utils.mjs";

// ProductData handles fetching the correct JSON file and finding products by ID.
import ProductData from "./ProductData.mjs";

// ProductDetails handles rendering the page and managing cart interactions.
import ProductDetails from "./ProductDetails.mjs";

// --- Read the product ID from the URL ---
// If someone navigates to  product_pages/?product=880RR
// then productId will be the string "880RR".
const productId = getParam("product");

// --- Create the data source ---
// Passing 'tents' tells ProductData to fetch from json/tents.json.
const dataSource = new ProductData("tents");

// --- Create the ProductDetails instance and start it up ---
// We pass both the productId and the dataSource so the class has
// everything it needs to fetch and display the correct product.
const product = new ProductDetails(productId, dataSource);

// init() is async (it awaits the fetch), so it returns a Promise.
// Calling it here kicks off the whole flow: fetch → render → attach listener.
product.init();

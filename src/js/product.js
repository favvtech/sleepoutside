import { clearLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// One-time reset of stale cart data after image path fix (remove after deploy if desired)
const STORAGE_VERSION = "2";
if (localStorage.getItem("so-storage-version") !== STORAGE_VERSION) {
  clearLocalStorage("so-cart");
  localStorage.setItem("so-storage-version", STORAGE_VERSION);
}

const productId = getParam("product");
const dataSource = new ProductData("tents");

const product = new ProductDetails(productId, dataSource);
product.init();

import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, LoadHeaderFooter } from "./utils.mjs";

const category = getParam("category") || "tents";
const dataSource = new ProductData();
const productListElement = document.querySelector(".product-list");
const title = document.querySelector(".product-listing__title");
const listing = new ProductList(category, dataSource, productListElement);

if (title) {
  const categoryName = category
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
  title.textContent = `Top Products: ${categoryName}`;
}

listing.init();
LoadHeaderFooter();

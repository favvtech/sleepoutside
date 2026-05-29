import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, LoadHeaderFooter } from "./utils.mjs";

const category = getParam("category") || "tents";
const searchTerm = getParam("search");
const query = searchTerm || category;
const dataSource = new ExternalServices();
const productListElement = document.querySelector(".product-list");
const title = document.querySelector(".product-listing__title");
const sort = document.querySelector(".product-sort");
const breadcrumbs = document.querySelector(".breadcrumbs");
const listing = new ProductList(query, dataSource, productListElement);

function formatCategory(value) {
  return value
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

function updateTitle() {
  if (!title) {
    return;
  }

  if (searchTerm) {
    title.textContent = `Search Results: ${searchTerm}`;
    return;
  }

  title.textContent = `Top Products: ${formatCategory(category)}`;
}

function updateBreadcrumb(products) {
  if (!breadcrumbs) {
    return;
  }

  const label = searchTerm ? "Search Results" : formatCategory(category);
  breadcrumbs.textContent = `${label}->(${products.length} items)`;
}

async function init() {
  LoadHeaderFooter();
  updateTitle();

  const products = await listing.init();
  updateBreadcrumb(products);

  if (sort) {
    sort.addEventListener("change", () => {
      listing.sortProducts(sort.value);
    });
  }
}

init();

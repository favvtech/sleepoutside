import Alert from "./Alert.js";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { LoadHeaderFooter } from "./utils.mjs";

const productListElement = document.querySelector(".products .product-list");
const isHomePage = Boolean(document.querySelector(".hero"));

if (isHomePage && productListElement) {
  const dataSource = new ProductData("tents");
  const listing = new ProductList("tents", dataSource, productListElement);
  const alerts = new Alert();

  alerts.init();
  listing.init();
}

LoadHeaderFooter();
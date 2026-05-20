import Alert from "./alert.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./productList.mjs";

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const listing = new ProductList("tents", dataSource, element);
const alerts = new Alert();

alerts.init();
listing.init();
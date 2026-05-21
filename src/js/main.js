import Alert from "./Alert.js";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { LoadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const listing = new ProductList("tents", dataSource, element);
const alerts = new Alert();

alerts.init();
listing.init();
LoadHeaderFooter();
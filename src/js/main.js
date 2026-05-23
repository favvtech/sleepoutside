import Alert from "./Alert.js";
import { LoadHeaderFooter } from "./utils.mjs";

const isHomePage = Boolean(document.querySelector(".hero"));

if (isHomePage) {
  const alerts = new Alert();
  alerts.init();
}

LoadHeaderFooter();
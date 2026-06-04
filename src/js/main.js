import { LoadHeaderFooter, showRegisterBanner, showSiteAlerts } from "./utils.mjs";

const isHomePage = Boolean(document.querySelector(".hero"));

if (isHomePage) {
  showSiteAlerts();
  showRegisterBanner();
}

LoadHeaderFooter();
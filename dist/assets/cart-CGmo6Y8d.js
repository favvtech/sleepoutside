import{a as t,g as s}from"./utils-Dc9C3Q-q.js";/* empty css              */function e(){const a=t("so-cart"),r=(Array.isArray(a)?a:a?[a]:[]).map(c=>o(c));document.querySelector(".product-list").innerHTML=r.join("")}function o(a){return`<li class="cart-card divider">
  <a href="product_pages/?product=${a.Id}" class="cart-card__image">
    <img
      src="${s(a.Image)}"
      alt="${a.Name}"
    />
  </a>
  <a href="product_pages/?product=${a.Id}">
    <h2 class="card__name">${a.Name}</h2>
  </a>
  <p class="cart-card__color">${a.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${a.FinalPrice.toFixed(2)}</p>
</li>`}e();

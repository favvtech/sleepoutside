import{g as e,a as s}from"./utils-hT3waOZs.js";/* empty css              */function o(){const a=e("so-cart"),t=(Array.isArray(a)?a:a?[a]:[]).map(c=>n(c));document.querySelector(".product-list").innerHTML=t.join("")}function n(a){return`<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${s(a.Image)}"
      alt="${a.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${a.Name}</h2>
  </a>
  <p class="cart-card__color">${a.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${a.FinalPrice}</p>
</li>`}o();

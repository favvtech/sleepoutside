import{b as s,g as l}from"./utils-CFYFw6yV.js";/* empty css              */function d(){const t=s("so-cart");return Array.isArray(t)?t:t?[t]:[]}function a(t){return Number(t.FinalPrice)||0}function i(){const t=d(),r=document.querySelector(".product-list");t.length===0?r.innerHTML="":r.innerHTML=t.map(e=>p(e)).join(""),u(t)}function u(t){const r=document.querySelector(".cart-footer"),e=document.querySelector(".cart-total");if(!r||!e)return;if(t.length===0){r.classList.add("hide"),e.textContent="Total: ";return}const c=t.reduce((o,n)=>o+a(n),0);r.classList.remove("hide"),e.textContent=`Total: $${c.toFixed(2)}`}function p(t){return`<li class="cart-card divider">
  <a href="/product_pages/?product=${t.Id}" class="cart-card__image">
    <img
      src="${l(t.Image)}"
      alt="${t.Name}"
    />
  </a>
  <a href="/product_pages/?product=${t.Id}">
    <h2 class="card__name">${t.Name}</h2>
  </a>
  <p class="cart-card__color">${t.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${a(t).toFixed(2)}</p>
</li>`}i();

import{b as s,g as l}from"./utils-CFYFw6yV.js";/* empty css              */function i(){const t=s("so-cart");return t?(Array.isArray(t)?t:[t]).filter(r=>r&&typeof r=="object"&&r.Id&&Array.isArray(r.Colors)&&r.Colors.length>0):[]}function a(t){return Number(t.FinalPrice)||0}function d(){const t=i(),e=document.querySelector(".product-list");e&&(t.length===0?e.innerHTML="":e.innerHTML=t.map(r=>p(r)).join(""),u(t))}function u(t){const e=document.querySelector(".cart-footer"),r=document.querySelector(".cart-total");if(!e||!r)return;if(t.length===0){e.classList.add("hide"),r.textContent="Total: ";return}const o=t.reduce((c,n)=>c+a(n),0);e.classList.remove("hide"),r.textContent=`Total: $${o.toFixed(2)}`}function p(t){var r;const e=((r=t.Colors[0])==null?void 0:r.ColorName)??"";return`<li class="cart-card divider">
  <a href="/product_pages/?product=${t.Id}" class="cart-card__image">
    <img
      src="${l(t.Image)}"
      alt="${t.Name??"Cart item"}"
    />
  </a>
  <a href="/product_pages/?product=${t.Id}">
    <h2 class="card__name">${t.Name??""}</h2>
  </a>
  <p class="cart-card__color">${e}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${a(t).toFixed(2)}</p>
</li>`}d();

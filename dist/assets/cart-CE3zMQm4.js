import{L as i,s as u,g as d,a as m}from"./utils-BelHsIKV.js";function n(){const t=d("so-cart");return t?(Array.isArray(t)?t:[t]).filter(e=>e&&typeof e=="object"&&e.Id&&Array.isArray(e.Colors)&&e.Colors.length>0):[]}function s(t){return Number(t.FinalPrice)||0}function f(t){const r=n();t<0||t>=r.length||(r.splice(t,1),u("so-cart",r),l())}function p(){const t=document.querySelector(".product-list");t&&t.addEventListener("click",r=>{const e=r.target.closest(".cart-card__remove");if(!e)return;const a=Number(e.dataset.index);Number.isInteger(a)&&f(a)})}function l(){const t=n(),r=document.querySelector(".product-list");r&&(t.length===0?r.innerHTML="":r.innerHTML=t.map((e,a)=>_(e,a)).join(""),g(t))}function g(t){const r=document.querySelector(".cart-footer"),e=document.querySelector(".cart-total");if(!r||!e)return;if(t.length===0){r.classList.add("hide"),e.textContent="Total: ";return}const a=t.reduce((o,c)=>o+s(c),0);r.classList.remove("hide"),e.textContent=`Total: $${a.toFixed(2)}`}function _(t,r){var o,c;const e=((o=t.Colors[0])==null?void 0:o.ColorName)??"",a=t.Image||((c=t.Images)==null?void 0:c.PrimaryMedium);return`<li class="cart-card divider">
  <a href="/product_pages/?product=${t.Id}" class="cart-card__image">
    <img
      src="${m(a)}"
      alt="${t.Name??"Cart item"}"
    />
  </a>
  <a href="/product_pages/?product=${t.Id}">
    <h2 class="card__name">${t.Name??""}</h2>
  </a>
  <p class="cart-card__color">${e}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${s(t).toFixed(2)}</p>
  <button class="cart-card__remove" type="button" data-index="${r}" aria-label="Remove ${t.Name??"item"} from cart">Remove</button>
</li>`}p();l();i();

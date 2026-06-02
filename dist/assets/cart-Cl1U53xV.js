import{L as m,s as u,u as i,g as f,a as p}from"./utils-BsOkHXPv.js";function c(){return f().filter(e=>e&&typeof e=="object"&&e.Id&&Array.isArray(e.Colors)&&e.Colors.length>0)}function l(t){return Number(t.FinalPrice)||0}function d(t){return Number(t.Quantity)||1}function g(t){const e=c();t<0||t>=e.length||(e.splice(t,1),u(e),s(),i())}function y(t,e){const r=c();t<0||t>=r.length||(r[t].Quantity=e,u(r),s(),i())}function C(){const t=document.querySelector(".product-list");t&&(t.addEventListener("click",e=>{const r=e.target.closest(".cart-card__remove");if(!r)return;const a=Number(r.dataset.index);Number.isInteger(a)&&g(a)}),t.addEventListener("change",e=>{const r=e.target.closest(".cart-card__quantity-input");if(!r)return;const a=Number(r.dataset.index),n=Number(r.value);Number.isInteger(a)&&n>0&&y(a,n)}))}function s(){const t=c(),e=document.querySelector(".product-list");e&&(t.length===0?e.innerHTML="":e.innerHTML=t.map((r,a)=>I(r,a)).join(""),_(t))}function _(t){const e=document.querySelector(".cart-footer"),r=document.querySelector(".cart-total");if(!e||!r)return;if(t.length===0){e.classList.add("hide"),r.textContent="Total: ";return}const a=t.reduce((n,o)=>n+l(o)*d(o),0);e.classList.remove("hide"),r.textContent=`Total: $${a.toFixed(2)}`}function I(t,e){var n,o;const r=((n=t.Colors[0])==null?void 0:n.ColorName)??"",a=t.Image||((o=t.Images)==null?void 0:o.PrimaryMedium);return`<li class="cart-card divider">
  <a href="/product_pages/?product=${t.Id}" class="cart-card__image">
    <img
      src="${p(a)}"
      alt="${t.Name??"Cart item"}"
    />
  </a>
  <a href="/product_pages/?product=${t.Id}">
    <h2 class="card__name">${t.Name??""}</h2>
  </a>
  <p class="cart-card__color">${r}</p>
  <label class="cart-card__quantity">
    qty:
    <input class="cart-card__quantity-input" type="number" min="1" value="${d(t)}" data-index="${e}" />
  </label>
  <p class="cart-card__price">$${l(t).toFixed(2)}</p>
  <button class="cart-card__remove" type="button" data-index="${e}" aria-label="Remove ${t.Name??"item"} from cart">Remove</button>
</li>`}C();s();m();

import{g as d,a as i,s as u}from"./main-vxxwf__x.js";function c(){const t=d("so-cart");return t?(Array.isArray(t)?t:[t]).filter(r=>r&&typeof r=="object"&&r.Id&&Array.isArray(r.Colors)&&r.Colors.length>0):[]}function n(t){return Number(t.FinalPrice)||0}function f(t){const e=t.target.dataset.id,r=c(),a=r.findIndex(o=>o.Id===e);a!==-1&&r.splice(a,1),u("so-cart",r),s()}function s(){const t=c(),e=document.querySelector(".product-list");e&&(t.length===0?e.innerHTML="":e.innerHTML=t.map(r=>m(r)).join(""),document.querySelectorAll(".cart-card__remove").forEach(r=>{r.addEventListener("click",f)}),p(t))}function p(t){const e=document.querySelector(".cart-footer"),r=document.querySelector(".cart-total");if(!e||!r)return;if(t.length===0){e.classList.add("hide"),r.textContent="Total: ";return}const a=t.reduce((o,l)=>o+n(l),0);e.classList.remove("hide"),r.textContent=`Total: $${a.toFixed(2)}`}function m(t){var r;const e=((r=t.Colors[0])==null?void 0:r.ColorName)??"";return`<li class="cart-card divider">
  <a href="/product_pages/?product=${t.Id}" class="cart-card__image">
    <img
      src="${i(t.Image)}"
      alt="${t.Name??"Cart item"}"
    />
  </a>
  <a href="/product_pages/?product=${t.Id}">
    <h2 class="card__name">${t.Name??""}</h2>
  </a>
  <p class="cart-card__color">${e}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${n(t).toFixed(2)}</p>
  <button class="cart-card__remove" data-id="${t.Id}">X</button>
</li>`}s();

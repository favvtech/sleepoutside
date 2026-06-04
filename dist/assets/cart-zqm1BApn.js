import{L as g,g as h,a as p,b as C,s as i,u,c as l,d as y,e as _}from"./utils.js";function o(){return y().filter(e=>e&&typeof e=="object"&&e.Id)}function d(t){return Number(t.FinalPrice)||0}function m(t){return Number(t.Quantity)||1}function I(t){const e=o();t<0||t>=e.length||(e.splice(t,1),i(e),s(),u(),l())}function b(t,e){const r=o();t<0||t>=r.length||(r[t].Quantity=e,i(r),s(),u(),l())}function $(){const t=document.querySelector(".product-list"),e=document.querySelector(".cart-checkout");e&&e.addEventListener("click",k),h("checkout")==="login-required"&&f(),t&&(t.addEventListener("click",r=>{const a=r.target.closest(".cart-card__remove");if(!a)return;const n=Number(a.dataset.index);Number.isInteger(n)&&I(n)}),t.addEventListener("change",r=>{const a=r.target.closest(".cart-card__quantity-input");if(!a)return;const n=Number(a.dataset.index),c=Number(a.value);Number.isInteger(n)&&c>0&&b(n,c)}))}function f(){if(document.querySelector(".checkout-login-alert"))return;const t=encodeURIComponent("/checkout/index.html"),e=C(`Please <a href="/register/index.html?redirect=${t}">register</a> or <a href="/signin/index.html?redirect=${t}">sign in</a> before checking out.`);e==null||e.classList.add("checkout-login-alert")}function k(){if(p()){window.location.href="/checkout/index.html";return}f()}function s(){const t=o(),e=document.querySelector(".product-list");e&&(t.length===0?e.innerHTML="":e.innerHTML=t.map((r,a)=>v(r,a)).join(""),q(t))}function q(t){const e=document.querySelector(".cart-footer"),r=document.querySelector(".cart-total");if(!e||!r)return;if(t.length===0){e.classList.add("hide"),r.textContent="Total: ";return}const a=t.reduce((n,c)=>n+d(c)*m(c),0);e.classList.remove("hide"),r.textContent=`Total: $${a.toFixed(2)}`}function v(t,e){var n,c;const r=((n=t.Colors[0])==null?void 0:n.ColorName)??"",a=t.Image||((c=t.Images)==null?void 0:c.PrimaryMedium);return`<li class="cart-card divider">
  <a href="/product_pages/?product=${t.Id}" class="cart-card__image">
    <img
      src="${_(a)}"
      alt="${t.Name??"Cart item"}"
    />
  </a>
  <a href="/product_pages/?product=${t.Id}" class="card__name">
    ${t.Name??""}
  </a>
  <p class="cart-card__color">${r}</p>
  <label class="cart-card__quantity">
    qty:
    <input class="cart-card__quantity-input" type="number" min="1" value="${m(t)}" data-index="${e}" />
  </label>
  <p class="cart-card__price">$${d(t).toFixed(2)}</p>
  <button class="cart-card__remove" type="button" data-index="${e}" aria-label="Remove ${t.Name??"item"} from cart">Remove</button>
</li>`}$();s();g();

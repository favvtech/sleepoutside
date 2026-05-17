import{b as s,a as n}from"./utils-C1NaRUHS.js";/* empty css              */function l(){const t=s("so-cart");return Array.isArray(t)?t:t?[t]:[]}function d(){const t=l(),r=t.map(a=>u(a));document.querySelector(".product-list").innerHTML=r.join(""),i(t)}function i(t){const r=document.querySelector(".cart-footer"),a=document.querySelector(".cart-total");if(t.length===0){r.classList.add("hide"),a.textContent="Total: ";return}const e=t.reduce((c,o)=>c+o.FinalPrice,0);r.classList.remove("hide"),a.textContent=`Total: $${e.toFixed(2)}`}function u(t){return`<li class="cart-card divider">
  <a href="product_pages/?product=${t.Id}" class="cart-card__image">
    <img
      src="${n(t.Image)}"
      alt="${t.Name}"
    />
  </a>
  <a href="product_pages/?product=${t.Id}">
    <h2 class="card__name">${t.Name}</h2>
  </a>
  <p class="cart-card__color">${t.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${t.FinalPrice.toFixed(2)}</p>
</li>`}d();

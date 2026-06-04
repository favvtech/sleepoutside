import{r as _,e as d,n as $,g as w,L as I,o as L}from"./utils.js";import{E as S}from"./ExternalServices.js";function o(e,t){var r,i;return((r=e.Images)==null?void 0:r[t])||e.Image||((i=e.Images)==null?void 0:i.PrimaryMedium)||""}function k(e){return[[o(e,"PrimarySmall"),"80w"],[o(e,"PrimaryMedium"),"160w"],[o(e,"PrimaryLarge"),"320w"]].filter(([r])=>r).map(([r,i])=>`${d(r)} ${i}`).join(", ")}function v(e,t){const r=o(e,"PrimaryMedium"),i=k(e),a=e.Category||t||"",n=a?`&category=${a}`:"";return`<li class="product-card">
  <a href="/product_pages/?product=${e.Id}${n}">
    <img
      src="${d(r)}"
      ${i?`srcset="${i}" sizes="(min-width: 900px) 250px, (min-width: 700px) 180px, 80vw"`:""}
      alt="${e.Name}"
    />
    <h3 class="card__brand">${e.Brand.Name}</h3>
    <h2 class="card__name">${e.NameWithoutBrand}</h2>
    ${$(e)}
  </a>
  <button class="product-card__quick-view" type="button" data-quick-view-id="${e.Id}">
    Quick View
  </button>
</li>`}function N(e){return e.NameWithoutBrand.split(" - ")[0]}function C(e){const t=new Set;return e.filter(r=>{const i=N(r);return t.has(i)?!1:(t.add(i),!0)})}class q{constructor(t,r,i){this.category=t,this.dataSource=r,this.listElement=i,this.products=[]}async init(){const t=await this.dataSource.getData(this.category);return this.products=C(t),this.renderList(this.products),this.products}sortProducts(t){const r=[...this.products];t==="name-asc"&&r.sort((i,a)=>i.Name.localeCompare(a.Name)),t==="name-desc"&&r.sort((i,a)=>a.Name.localeCompare(i.Name)),t==="price-asc"&&r.sort((i,a)=>Number(i.FinalPrice)-Number(a.FinalPrice)),t==="price-desc"&&r.sort((i,a)=>Number(a.FinalPrice)-Number(i.FinalPrice)),this.renderList(r)}renderList(t){if(!t.length){this.listElement.innerHTML=`
        <li class="product-list__empty">
          No products found. Try a different search or browse another category.
        </li>
      `;return}_(r=>v(r,this.category),this.listElement,t,"afterbegin",!0)}}const m=w("category")||"tents",c=w("search"),x=c||m,P=new S,u=document.querySelector(".product-list"),l=document.querySelector(".product-listing__title"),g=document.querySelector(".product-sort"),h=document.querySelector(".breadcrumbs"),s=document.getElementById("productQuickViewModal"),y=s==null?void 0:s.querySelector(".product-modal__body"),p=new q(x,P,u);function M(e){var t,r,i;return[[(t=e.Images)==null?void 0:t.PrimarySmall,"80w"],[(r=e.Images)==null?void 0:r.PrimaryMedium,"160w"],[(i=e.Images)==null?void 0:i.PrimaryLarge,"320w"]].filter(([a])=>a).map(([a,n])=>`${d(a)} ${n}`).join(", ")}function T(e){var a,n,f;const t=d(((a=e.Images)==null?void 0:a.PrimaryMedium)||((n=e.Images)==null?void 0:n.PrimaryLarge)||e.Image||""),r=M(e),i=e.Category?`&category=${encodeURIComponent(e.Category)}`:"";return`
    <div class="product-quick-view">
      <button class="product-modal__close" type="button" aria-label="Close quick view">&times;</button>
      <img src="${t}" ${r?`srcset="${r}" sizes="(min-width: 700px) 320px, 80vw"`:""} alt="${e.NameWithoutBrand}" />
      <h3 class="card__brand">${((f=e.Brand)==null?void 0:f.Name)||""}</h3>
      <h2 class="card__name">${e.NameWithoutBrand}</h2>
      ${$(e)}
      <div class="product-description">${e.DescriptionHtmlSimple||e.Description||""}</div>
      <a class="button" href="/product_pages/?product=${e.Id}${i}">View full product</a>
    </div>
  `}function H(e){!s||!y||(y.innerHTML=T(e),s.classList.remove("hide"))}function V(){s&&s.classList.add("hide")}u==null||u.addEventListener("click",async e=>{const t=e.target.closest("[data-quick-view-id]");if(!t)return;e.preventDefault();const r=t.dataset.quickViewId,i=await P.findProductById(r);H(i)});s==null||s.addEventListener("click",e=>{(e.target===s||e.target.closest(".product-modal__close"))&&V()});function b(e){return e.split("-").map(t=>t[0].toUpperCase()+t.slice(1)).join(" ")}function B(){if(l){if(c){l.textContent=`Search Results: ${c}`;return}l.textContent=`Top Products: ${b(m)}`}}function E(e){if(!h)return;const t='<a href="/index.html">Home</a>';if(c){h.innerHTML=`${t} &gt; Search results for "${c}" (${e.length} items)`;return}const r=b(m),i=`<a href="/product_listing/index.html?category=${encodeURIComponent(m)}">${r}</a>`;h.innerHTML=`${t} &gt; ${i} &gt; ${e.length} items`}async function F(){I(),await L(),B();const e=await p.init();E(e),g&&g.addEventListener("change",()=>{p.sortProducts(g.value)})}F();

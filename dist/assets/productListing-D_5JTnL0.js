import{r as _,a as m,b as p,c as $,L as b}from"./utils-BsOkHXPv.js";import{P as I}from"./ProductData-CDypgzgp.js";function n(t,e){var r,a;return((r=t.Images)==null?void 0:r[e])||t.Image||((a=t.Images)==null?void 0:a.PrimaryMedium)||""}function S(t){return[[n(t,"PrimarySmall"),"80w"],[n(t,"PrimaryMedium"),"160w"],[n(t,"PrimaryLarge"),"320w"]].filter(([r])=>r).map(([r,a])=>`${m(r)} ${a}`).join(", ")}function L(t,e){const r=n(t,"PrimaryMedium"),a=S(t),s=t.Category||e||"",c=s?`&category=${s}`:"";return`<li class="product-card">
  <a href="/product_pages/?product=${t.Id}${c}">
    <img
      src="${m(r)}"
      ${a?`srcset="${a}" sizes="(min-width: 700px) 160px, 80px"`:""}
      alt="${t.Name}"
    />
    <h3 class="card__brand">${t.Brand.Name}</h3>
    <h2 class="card__name">${t.NameWithoutBrand}</h2>
    ${p(t)}
  </a>
  <button class="product-card__quick-view" type="button" data-quick-view-id="${t.Id}">
    Quick View
  </button>
</li>`}function k(t){return t.NameWithoutBrand.split(" - ")[0]}function q(t){const e=new Set;return t.filter(r=>{const a=k(r);return e.has(a)?!1:(e.add(a),!0)})}class v{constructor(e,r,a){this.category=e,this.dataSource=r,this.listElement=a,this.products=[]}async init(){const e=await this.dataSource.getData(this.category);return this.products=q(e),this.renderList(this.products),this.products}sortProducts(e){const r=[...this.products];e==="name"&&r.sort((a,s)=>a.Name.localeCompare(s.Name)),e==="price"&&r.sort((a,s)=>a.FinalPrice-s.FinalPrice),this.renderList(r)}renderList(e){_(r=>L(r,this.category),this.listElement,e,"afterbegin",!0)}}const g=$("category")||"tents",u=$("search"),C=u||g,P=new I,o=document.querySelector(".product-list"),d=document.querySelector(".product-listing__title"),l=document.querySelector(".product-sort"),h=document.querySelector(".breadcrumbs"),i=document.getElementById("productQuickViewModal"),y=i==null?void 0:i.querySelector(".product-modal__body"),f=new v(C,P,o);function B(t){var a,s,c;const e=m(((a=t.Images)==null?void 0:a.PrimaryMedium)||((s=t.Images)==null?void 0:s.PrimaryLarge)||t.Image||""),r=t.Category?`&category=${encodeURIComponent(t.Category)}`:"";return`
    <div class="product-quick-view">
      <button class="product-modal__close" type="button" aria-label="Close quick view">&times;</button>
      <img src="${e}" alt="${t.NameWithoutBrand}" />
      <h3 class="card__brand">${((c=t.Brand)==null?void 0:c.Name)||""}</h3>
      <h2 class="card__name">${t.NameWithoutBrand}</h2>
      ${p(t)}
      <div class="product-description">${t.DescriptionHtmlSimple||t.Description||""}</div>
      <a class="button" href="/product_pages/?product=${t.Id}${r}">View full product</a>
    </div>
  `}function N(t){!i||!y||(y.innerHTML=B(t),i.classList.remove("hide"))}function V(){i&&i.classList.add("hide")}o==null||o.addEventListener("click",async t=>{const e=t.target.closest("[data-quick-view-id]");if(!e)return;t.preventDefault();const r=e.dataset.quickViewId,a=await P.findProductById(r);N(a)});i==null||i.addEventListener("click",t=>{(t.target===i||t.target.closest(".product-modal__close"))&&V()});function w(t){return t.split("-").map(e=>e[0].toUpperCase()+e.slice(1)).join(" ")}function x(){if(d){if(u){d.textContent=`Search Results: ${u}`;return}d.textContent=`Top Products: ${w(g)}`}}function M(t){if(!h)return;const e=u?"Search Results":w(g);h.textContent=`${e}->(${t.length} items)`}async function T(){b(),x();const t=await f.init();M(t),l&&l.addEventListener("change",()=>{f.sortProducts(l.value)})}T();

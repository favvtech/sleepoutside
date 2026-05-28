import{r as p,b as l,c as y,d as g,L as P}from"./utils-DnA3psMX.js";import{P as $}from"./ProductData-BzbZu8QD.js";function i(t,e){var r,s;return((r=t.Images)==null?void 0:r[e])||t.Image||((s=t.Images)==null?void 0:s.PrimaryMedium)||""}function S(t){return[[i(t,"PrimarySmall"),"80w"],[i(t,"PrimaryMedium"),"160w"],[i(t,"PrimaryLarge"),"320w"]].filter(([r])=>r).map(([r,s])=>`${l(r)} ${s}`).join(", ")}function L(t,e){const r=i(t,"PrimaryMedium"),s=S(t),a=t.Category||e||"",f=a?`&category=${a}`:"";return`<li class="product-card">
  <a href="/product_pages/?product=${t.Id}${f}">
    <img
      src="${l(r)}"
      ${s?`srcset="${s}" sizes="(min-width: 700px) 160px, 80px"`:""}
      alt="${t.Name}"
    />
    <h3 class="card__brand">${t.Brand.Name}</h3>
    <h2 class="card__name">${t.NameWithoutBrand}</h2>
    ${y(t)}
  </a>
</li>`}function b(t){return t.NameWithoutBrand.split(" - ")[0]}function C(t){const e=new Set;return t.filter(r=>{const s=b(r);return e.has(s)?!1:(e.add(s),!0)})}class w{constructor(e,r,s){this.category=e,this.dataSource=r,this.listElement=s,this.products=[]}async init(){const e=await this.dataSource.getData(this.category);return this.products=C(e),this.renderList(this.products),this.products}sortProducts(e){const r=[...this.products];e==="name"&&r.sort((s,a)=>s.Name.localeCompare(a.Name)),e==="price"&&r.sort((s,a)=>s.FinalPrice-a.FinalPrice),this.renderList(r)}renderList(e){p(r=>L(r,this.category),this.listElement,e,"afterbegin",!0)}}const u=g("category")||"tents",n=g("search"),I=n||u,_=new $,q=document.querySelector(".product-list"),c=document.querySelector(".product-listing__title"),o=document.querySelector(".product-sort"),m=document.querySelector(".breadcrumbs"),d=new w(I,_,q);function h(t){return t.split("-").map(e=>e[0].toUpperCase()+e.slice(1)).join(" ")}function x(){if(c){if(n){c.textContent=`Search Results: ${n}`;return}c.textContent=`Top Products: ${h(u)}`}}function N(t){if(!m)return;const e=n?"Search Results":h(u);m.textContent=`${e}->(${t.length} items)`}async function F(){P(),x();const t=await d.init();N(t),o&&o.addEventListener("change",()=>{d.sortProducts(o.value)})}F();

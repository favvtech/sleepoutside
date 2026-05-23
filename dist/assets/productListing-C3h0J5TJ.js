import{r as n,a as c,b as o,c as l,L as m}from"./utils-BelHsIKV.js";import{P as u}from"./ProductData-BGObGv2c.js";function d(t){var a;const e=t.Image||((a=t.Images)==null?void 0:a.PrimaryMedium);return`<li class="product-card">
  <a href="/product_pages/?product=${t.Id}">
    <img
      src="${c(e)}"
      alt="${t.Name}"
    />
    <h3 class="card__brand">${t.Brand.Name}</h3>
    <h2 class="card__name">${t.NameWithoutBrand}</h2>
    ${o(t)}
  </a>
</li>`}function g(t){return t.NameWithoutBrand.split(" - ")[0]}function h(t){const e=new Set;return t.filter(a=>{const r=g(a);return e.has(r)?!1:(e.add(r),!0)})}class p{constructor(e,a,r){this.category=e,this.dataSource=a,this.listElement=r}async init(){const e=await this.dataSource.getData(this.category);this.renderList(h(e))}renderList(e){n(d,this.listElement,e,"afterbegin",!0)}}const i=l("category")||"tents",f=new u,y=document.querySelector(".product-list"),s=document.querySelector(".product-listing__title"),P=new p(i,f,y);if(s){const t=i.split("-").map(e=>e[0].toUpperCase()+e.slice(1)).join(" ");s.textContent=`Top Products: ${t}`}P.init();m();

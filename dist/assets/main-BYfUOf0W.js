import{r as o,g as c,a as i}from"./utils-CFYFw6yV.js";/* empty css              */import{P as l}from"./ProductData-VHH8lkW7.js";class d{constructor(t="/json/alerts.json"){this.path=t}async init(){const t=await this.loadAlerts();if(!t.length)return;const a=document.createElement("section");a.classList.add("alert-list"),t.forEach(n=>{const s=document.createElement("p");s.textContent=n.message,s.style.backgroundColor=n.background,s.style.color=n.color,a.appendChild(s)});const r=document.querySelector("main");r&&r.prepend(a)}async loadAlerts(){try{const t=await fetch(this.path);if(!t.ok)return[];const a=await t.json();return Array.isArray(a)?a:[]}catch(t){return console.warn("Unable to load alerts:",t),[]}}}function m(e){return`<li class="product-card">
  <a href="product_pages/?product=${e.Id}">
    <img
      src="${c(e.Image)}"
      alt="${e.Name}"
    />
    <h3 class="card__brand">${e.Brand.Name}</h3>
    <h2 class="card__name">${e.NameWithoutBrand}</h2>
    ${i(e)}
  </a>
</li>`}class u{constructor(t,a,r){this.category=t,this.dataSource=a,this.listElement=r}async init(){const t=await this.dataSource.getProductsByCount(4);this.renderList(t)}renderList(t){o(m,this.listElement,t,"afterbegin",!0)}}const h=new l("tents"),g=document.querySelector(".product-list"),p=new u("tents",h,g),y=new d;y.init();p.init();

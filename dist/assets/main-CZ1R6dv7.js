import{r as c,a as i,d,L as l}from"./utils-D2iO0KDb.js";class u{constructor(t="/json/alerts.json"){this.path=t}async init(){const t=await this.loadAlerts();if(!t.length)return;const s=document.createElement("section");s.classList.add("alert-list"),t.forEach(n=>{const r=document.createElement("p");r.textContent=n.message,r.style.backgroundColor=n.background,r.style.color=n.color,s.appendChild(r)});const a=document.querySelector("main");a&&a.prepend(s)}async loadAlerts(){try{const t=await fetch(this.path);if(!t.ok)return[];const s=await t.json();return Array.isArray(s)?s:[]}catch{return[]}}}function h(e){if(e.ok)return e.json();throw new Error("Bad Response")}class m{constructor(t){this.category=t,this.path=`/json/${this.category}.json`}getData(){return fetch(this.path).then(h).then(t=>t)}async findProductById(t){return(await this.getData()).find(a=>a.Id===t)}async getProductsByCount(t=4){const s=await this.getData();return["880RR","985RF","985PR","344YJ"].map(n=>s.find(r=>r.Id===n)).filter(Boolean).slice(0,t)}}function p(e){return`<li class="product-card">
  <a href="product_pages/?product=${e.Id}">
    <img
      src="${i(e.Image)}"
      alt="${e.Name}"
    />
    <h3 class="card__brand">${e.Brand.Name}</h3>
    <h2 class="card__name">${e.NameWithoutBrand}</h2>
    ${d(e)}
  </a>
</li>`}class g{constructor(t,s,a){this.category=t,this.dataSource=s,this.listElement=a}async init(){const t=await this.dataSource.getProductsByCount(4);this.renderList(t)}renderList(t){c(p,this.listElement,t,"afterbegin",!0)}}const o=document.querySelector(".products .product-list"),f=!!document.querySelector(".hero");if(f&&o){const e=new m("tents"),t=new g("tents",e,o);new u().init(),t.init()}l();export{m as P};

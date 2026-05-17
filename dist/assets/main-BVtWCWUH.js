import{r,g as i,a as n}from"./utils-CFYFw6yV.js";/* empty css              */import{P as c}from"./ProductData-VHH8lkW7.js";function o(t){return`<li class="product-card">
  <a href="product_pages/?product=${t.Id}">
    <img
      src="${i(t.Image)}"
      alt="${t.Name}"
    />
    <h3 class="card__brand">${t.Brand.Name}</h3>
    <h2 class="card__name">${t.NameWithoutBrand}</h2>
    ${n(t)}
  </a>
</li>`}class l{constructor(e,a,s){this.category=e,this.dataSource=a,this.listElement=s}async init(){const e=await this.dataSource.getProductsByCount(4);this.renderList(e)}renderList(e){r(o,this.listElement,e,"afterbegin",!0)}}const m=new c("tents"),d=document.querySelector(".product-list"),u=new l("tents",m,d);u.init();

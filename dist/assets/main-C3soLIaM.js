import{r as s,g as i}from"./utils-Dc9C3Q-q.js";/* empty css              */import{P as c}from"./ProductData-VHH8lkW7.js";function n(t){return`<li class="product-card">
  <a href="product_pages/?product=${t.Id}">
    <img
      src="${i(t.Image)}"
      alt="${t.Name}"
    />
    <h3 class="card__brand">${t.Brand.Name}</h3>
    <h2 class="card__name">${t.NameWithoutBrand}</h2>
    <p class="product-card__price">$${t.FinalPrice.toFixed(2)}</p>
  </a>
</li>`}class o{constructor(e,a,r){this.category=e,this.dataSource=a,this.listElement=r}async init(){const e=await this.dataSource.getProductsByCount(4);this.renderList(e)}renderList(e){s(n,this.listElement,e,"afterbegin",!0)}}const d=new c("tents"),l=document.querySelector(".product-list"),m=new o("tents",d,l);m.init();

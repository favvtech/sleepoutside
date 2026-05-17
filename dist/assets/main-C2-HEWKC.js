import{r as i,i as r,g as n,a as c}from"./utils-C1NaRUHS.js";/* empty css              */import{P as o}from"./ProductData-VHH8lkW7.js";function d(t){const e=r(t)?`<p class="product-discount">Save $${n(t).toFixed(2)}</p>`:"";return`<li class="product-card">
  <a href="product_pages/?product=${t.Id}">
    <img
      src="${c(t.Image)}"
      alt="${t.Name}"
    />
    <h3 class="card__brand">${t.Brand.Name}</h3>
    <h2 class="card__name">${t.NameWithoutBrand}</h2>
    <p class="product-card__price">$${t.FinalPrice.toFixed(2)}</p>
    ${e}
  </a>
</li>`}class l{constructor(e,s,a){this.category=e,this.dataSource=s,this.listElement=a}async init(){const e=await this.dataSource.getProductsByCount(4);this.renderList(e)}renderList(e){i(d,this.listElement,e,"afterbegin",!0)}}const m=new o("tents"),u=document.querySelector(".product-list"),h=new l("tents",m,u);h.init();

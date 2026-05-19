import{g as n,s as u,a as l}from"./utils-D466v1pB.js";/* empty css              */function p(o){if(o.ok)return o.json();throw new Error("Bad Response")}class h{constructor(t){this.category=t,this.path=`../json/${this.category}.json`}getData(){return fetch(this.path).then(p).then(t=>t)}async findProductById(t){return(await this.getData()).find(r=>r.Id===t)}}class m{constructor(t,a){this.productId=t,this.product={},this.dataSource=a}async init(){this.product=await this.dataSource.findProductById(this.productId),this.renderProductDetails(),document.getElementById("addToCart").addEventListener("click",this.addProductToCart.bind(this))}addProductToCart(){const t=n("so-cart")||[];t.push(this.product),u("so-cart",t),alert(`${this.product.Name} has been added to your cart!`)}renderProductDetails(){const{Brand:t,NameWithoutBrand:a,Image:r,FinalPrice:e,Colors:d,DescriptionHtmlSimple:c,Id:s}=this.product,i=`
      <section class="product-detail">

        <!-- Brand name displayed as a small heading above the product title -->
        <h3>${t.Name}</h3>

        <!-- Product name without the brand prefix, styled with a divider -->
        <h2 class="divider">${a}</h2>

        <!-- Product image — src and alt come from the JSON data -->
        <img
          class="divider"
          src="${r}"
          alt="${t.Name} ${a}"
        />

        <!-- Final (sale) price formatted to two decimal places -->
        <p class="product-card__price">$${e.toFixed(2)}</p>

        <!-- First available color name -->
        <p class="product__color">${d[0].ColorName}</p>

        <!-- Description — uses innerHTML so HTML entities are decoded correctly -->
        <p class="product__description">${c}</p>

        <!-- Add to Cart button — data-id stores the product ID for reference -->
        <div class="product-detail__add">
          <button id="addToCart" data-id="${s}">Add to Cart</button>
        </div>

      </section>
    `;document.querySelector("main").innerHTML=i}}const g=l("product"),f=new h("tents"),y=new m(g,f);y.init();

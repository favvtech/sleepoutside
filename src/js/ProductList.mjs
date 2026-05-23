import { getImageUrl, getListingPriceHtml, renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const image = product.Image || product.Images?.PrimaryMedium;

  return `<li class="product-card">
  <a href="/product_pages/?product=${product.Id}">
    <img
      src="${getImageUrl(image)}"
      alt="${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    ${getListingPriceHtml(product)}
  </a>
</li>`;
}

function getProductFamily(product) {
  return product.NameWithoutBrand.split(" - ")[0];
}

function getUniqueProducts(products) {
  const productFamilies = new Set();

  return products.filter((product) => {
    const family = getProductFamily(product);
    if (productFamilies.has(family)) {
      return false;
    }

    productFamilies.add(family);
    return true;
  });
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(getUniqueProducts(list));
  }

  renderList(list) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      "afterbegin",
      true,
    );
  }
}

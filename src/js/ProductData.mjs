function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `/json/${this.category}.json`;
  }

  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }

  async getProductsByCount(count = 4) {
    const products = await this.getData();
    const featuredIds = ["880RR", "985RF", "985PR", "344YJ"];
    return featuredIds
      .map((id) => products.find((item) => item.Id === id))
      .filter(Boolean)
      .slice(0, count);
  }
}


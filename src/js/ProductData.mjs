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

  // Fetch all products
  async getData() {
    const response = await fetch(this.path);
    return convertToJson(response);
  }

  // Find a single product by Id
  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id.toLowerCase() === id.toLowerCase());
  }

  // Return a filtered list (e.g., top products)
  async getProductsByCount(count = 4) {
    const products = await this.getData();
    return products.slice(0, count);
  }
}


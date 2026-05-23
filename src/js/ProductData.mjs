const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  async getData(category) {
    const response = await fetch(
      `${baseURL}products/search/${encodeURIComponent(category)}`,
    );
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async getProductsByCount(count = 4) {
    const products = await this.getData("tents");
    const featuredIds = ["880RR", "985RF", "985PR", "344YJ"];
    return featuredIds
      .map((id) => products.find((item) => item.Id === id))
      .filter(Boolean)
      .slice(0, count);
  }
}

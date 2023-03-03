export default class DaoMemory {
  constructor() {
    this.products = [];
  }

  async save(obj) {
    this.products.push(obj);
    return obj;
  }

  async getAll() {
    return this.products;
  }

  async updateProductById(id, title, description, code, photo, value, stock) {
    try {
      console.log("sin implementar!");
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProductById(id) {
    try {
      console.log("sin implementar!");
    } catch (error) {
      console.log(error);
    }
  }
}

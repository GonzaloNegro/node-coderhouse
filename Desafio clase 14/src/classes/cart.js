import fs from "fs";
import moment from "moment";

class Cart {
  constructor(fileName) {
    this.fileName = fileName;
  }

  async validateExistFile() {
    try {
      await fs.promises.stat(this.fileName);
      return true;
    } catch (error) {
      console.log("El archivo no existe! Creandolo...");
      await fs.promises.writeFile(this.fileName, JSON.stringify([]));
      return false;
    }
  }

  async loadEmptyFile() {
    try {
      let cartDefault = [
        {
          id: 1,
          products: [
            {
              id: 1,
              timestamp: "04-11-22 18:34:30",
              title: "Zapatillas",
              description: "zapatillas",
              code: "x",
              photo:
                "https://static.vecteezy.com/system/resources/previews/005/403/247/non_2x/hand-drawn-sneaker-outline-drawing-black-line-sneaker-illustration-vector.jpg",
              value: 10.1,
              stock: 10,
            },
            {
              id: 2,
              timestamp: "04-11-22 18:34:40",
              title: "ojotas",
              description: "ojotas",
              code: "y",
              photo:
                "https://i.pinimg.com/564x/db/ba/d5/dbbad5e8b6072dfc42a5096fc8052160.jpg",
              value: 20.2,
              stock: 20,
            },
            {
              id: 3,
              timestamp: "04-11-22 18:34:50",
              title: "Remeras",
              description: "remeras",
              code: "z",
              photo:
                "https://i.pinimg.com/564x/db/ba/d5/dbbad5e8b6072dfc42a5096fc8052160.jpg",
              value: 10.1,
              stock: 30,
            },
          ],
        },
      ];
      const data = JSON.stringify(cartDefault, null, "\t");
      await fs.promises.writeFile(this.fileName, data);
    } catch (error) {
      throw new Error("No se pudo cargar el carrito por defecto!", error);
    }
  }

  async getAllProductsInCart() {
    try {
      let fileExist = await this.validateExistFile();
      if (!fileExist) {
        await this.loadEmptyFile();
      }
      const data = await fs.promises.readFile(this.fileName, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      throw new Error("No se pudo obtener los productos del carrito!", error);
    }
  }

  async saveCarts(carts) {
    try {
      const data = JSON.stringify(carts, null, "\t");
      await fs.promises.writeFile(this.fileName, data);
    } catch (error) {
      throw new Error("No se pudo guardar los carritos!", error);
    }
  }

  async getCartById(id) {
    try {
      const productsCart = await this.getAllProductsInCart();
      const index = productsCart.findIndex((cart) => cart.id === id);
      if (index < 0) {
        const productExists = {
          index: index,
          msg: "El carrito buscado no existe!",
        };
        throw productExists;
      }
      return productsCart[index];
    } catch (error) {
      throw error;
    }
  }

  async createCart() {
    try {
      const carts = await this.getAllProductsInCart();
      let id = 1;
      if (carts.length) {
        id = carts[carts.length - 1].id + 1;
      }

      const newCart = {
        id: id,
        timestamp: moment().format("DD-MM-YYYY HH:MM:SS"),
        products: [],
      };

      carts.push(newCart);

      await this.saveCarts(carts);
    } catch (error) {
      throw new Error("Hubo un problema al crear el carrito!", error);
    }
  }

  async deleteAll() {
    try {
      await this.saveProducts([]);
    } catch (error) {
      throw new Error("Hubo un problema al borrar todos los productos!", error);
    }
  }

  async deleteById(id) {
    try {
      const carts = await this.getAllProductsInCart();

      const index = carts.findIndex((cart) => cart.id === id);

      if (index < 0) {
        throw "El carrito a eliminar no existe!";
      }

      carts.splice(index, 1);

      await this.saveCarts(carts);
    } catch (error) {
      throw error;
    }
  }

  async deleteProductInCartById(cartId, productId) {
    try {
      const carts = await this.getAllProductsInCart();
      const cartIndex = carts.findIndex((cart) => cart.id === cartId);

      const productIndex = carts[cartIndex].products.findIndex(
        (product) => product.id === productId
      );

      if (productIndex < 0) {
        throw "El producto buscado no existe dentro del carrito!";
      }

      carts[cartIndex].products.splice(productIndex, 1);

      await this.saveCarts(carts);
    } catch (error) {
      throw error;
    }
  }

  async AddNewProductToCart(cartId, product) {
    try {
      const carts = await this.getAllProductsInCart();
      const index = carts.findIndex((cart) => cart.id === cartId);
      carts[index].products.push(product);
      await this.saveCarts(carts);
    } catch (error) {
      throw new Error("No se pudo agregar el producto al carrito!", error);
    }
  }
}

export default Cart;
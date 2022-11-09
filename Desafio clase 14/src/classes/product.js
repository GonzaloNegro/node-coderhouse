import fs from "fs";
import moment from "moment";

class Product {
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
      let productsDefault = [
        {
          id: 1,
          timestamp: "04-11-22 18:34:30",
          title: "Remeras",
          description: "remeras",
          code: "x",
          photo:
            "https://i.pinimg.com/564x/db/ba/d5/dbbad5e8b6072dfc42a5096fc8052160.jpg",
          value: 10.1,
          stock: 10,
        },
        {
          id: 2,
          timestamp: "04-11-22 18:34:35",
          title: "Pantalones",
          description: "pantalones",
          code: "z",
          photo:
            "https://www.educima.com/dibujo-para-colorear-pantalones-dl19332.jpg",
          value: 20.2,
          stock: 20,
        },
        {
          id: 3,
          timestamp: "04-11-22 18:34:40",
          title: "Zapatillas",
          description: "zapatillas",
          code: "y",
          photo:
            "https://static.vecteezy.com/system/resources/previews/005/403/247/non_2x/hand-drawn-sneaker-outline-drawing-black-line-sneaker-illustration-vector.jpg",
          value: 30.3,
          stock: 30,
        },
      ];
      const data = JSON.stringify(productsDefault, null, "\t");
      await fs.promises.writeFile(this.fileName, data);
    } catch (error) {
      throw new Error("No se pudo cargar los productos por defecto!", error);
    }
  }

  async getAll() {
    try {
      let fileExist = await this.validateExistFile();
      if (!fileExist) {
        await this.loadEmptyFile();
      }
      const data = await fs.promises.readFile(this.fileName, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      throw new Error("No se pudo obtener los productos!", error);
    }
  }

  async updateProduct(id, body) {
    const products = await this.getAll();
    let flagUpdate = false;

    try {
      products.forEach((product) => {
        if (product.id === id) {
          product.timestamp = moment().format("DD-MM-YYYY HH:MM:SS");
          product.title = body.title ? body.title : product.title;
          product.description = body.description;
          product.code = body.code;
          product.photo = body.photo;
          product.value = body.value;
          product.stock = body.stock;
          flagUpdate = true;
        }
      });
      if (flagUpdate) {
        await this.saveProducts(products);
      } else {
        throw "No existe el producto solicitado!";
      }
    } catch (error) {
      throw error;
    }
  }

  async saveProducts(products) {
    try {
      const data = JSON.stringify(products, null, "\t");
      await fs.promises.writeFile(this.fileName, data);
    } catch (error) {
      throw new Error("No se pudo guardar los productos!", error);
    }
  }

  async getById(id) {
    try {
      const products = await this.getAll();
      const index = products.findIndex((product) => product.id === id);
      if (index < 0) {
        const productExists = {
          index: index,
          msg: "El producto buscado no existe!",
        };
        throw productExists;
      }
      return products[index];
    } catch (error) {
      throw error;
    }
  }

  async saveProduct(data) {
    if (
      !data.title ||
      !data.description ||
      !data.code ||
      !data.photo ||
      !data.value ||
      !data.stock ||
      typeof data.title !== "string" ||
      typeof data.description !== "string" ||
      typeof data.code !== "string" ||
      typeof data.photo !== "string" ||
      typeof data.value !== "number" ||
      typeof data.stock !== "number"
    )
      throw "Datos inválidos!";

    try {
      const products = await this.getAll();
      let id = 1;
      if (products.length) {
        id = products[products.length - 1].id + 1;
      }

      const newProduct = {
        id: id,
        timestamp: moment().format("DD-MM-YYYY HH:MM:SS"),
        title: data.title,
        description: data.description,
        code: data.code,
        photo: data.photo,
        value: data.value,
        stock: data.stock,
      };

      products.push(newProduct);

      await this.saveProducts(products);
    } catch (error) {
      throw new Error(
        "Hubo un problema al guardar el producto solicitado!",
        error
      );
    }
  }

  async deleteById(id) {
    try {
      const products = await this.getAll();

      const index = products.findIndex((product) => product.id === id);

      if (index < 0) {
        const productExists = {
          index: index,
          msg: "El producto buscado no existe!",
        };
        throw productExists;
      }

      products.splice(index, 1);

      await this.saveProducts(products);
    } catch (error) {
      throw error;
    }
  }
}

export default Product;
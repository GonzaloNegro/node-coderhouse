class Contenedor {
    constructor(fileName) {
      this.fileName = fileName;
    }
  
    async validateExistFile() {
      try {
        await fs.promises.stat(this.fileName);
        return 1;
      } catch (error) {
        console.log("No existe el archivo! Generando uno nuevo...");
        await fs.promises.writeFile(this.fileName, JSON.stringify([]));
        return 0;
      }
    }
  
    async getAll() {
      try {
        const data = await fs.promises.readFile(this.fileName, "utf-8");
        return JSON.parse(data);
      } catch (error) {
        console.log("No se pueden obtener los productos!", error);
      }
    }
  
    async saveProducts(products) {
      try {
        const data = JSON.stringify(products, null, "\t");
        await fs.promises.writeFile(this.fileName, data);
      } catch (error) {
        console.log("No se pudieron guardar los productos!", error);
      }
    }
  
    async getById(id) {
      try {
        const products = await this.getAll();
        const index = products.findIndex((product) => product.id === id);
        if (index < 0) {
          throw new Error("El producto seleccionado no existe!");
        }
        return products[index];
      } catch (error) {
        console.log("Hubo un problema al buscar el producto!", error);
      }
    }
  
    async saveProduct(data) {
      if (
        !data.title ||
        !data.price ||
        !data.thumbnail ||
        typeof data.title !== "string" ||
        typeof data.price !== "number" ||
        typeof data.thumbnail !== "string"
      )
        throw new Error("Datos inválidos!");
  
      try {
        const products = await this.getAll();
        let id = 1;
        if (products.length) {
          id = products[products.length - 1].id + 1;
        }
  
        const newProduct = {
          title: data.title,
          price: data.price,
          thumbnail: data.thumbnail,
          id: id,
        };
  
        products.push(newProduct);
  
        await this.saveProducts(products);
      } catch (error) {
        console.log("Hubo un problema al guardar el producto solicitado!", error);
      }
    }
  
    async deleteAll() {
      try {
        await this.saveProducts([]);
      } catch (error) {
        console.log("Hubo un problema al borrar los productos!", error);
      }
    }
  
    async deleteById(id) {
      try {
        const products = await this.getAll();
  
        const index = products.findIndex((product) => product.id === id);
  
        if (index < 0) {
          throw new Error("El producto no existe!");
        }
  
        products.splice(index, 1);
  
        await this.saveProducts(products);
      } catch (error) {
        console.log("Hubo un problema al borrar el producto!", error);
      }
    }
  }
  
  const fs = require("fs");
  const fileName = "productos.json";
  const file = new Contenedor(fileName);
  
  const master = async () => {
    try {
      let exist = await file.validateExistFile();
      if (exist === 1) {
        console.log("El archivo ya existe!");
      }
  
      let products = await file.getAll();
  
      if (products.length == 0) {
        console.log("El archivo no tiene productos!");
      } else {
        console.log(products);
      }
  
      const product = await file.getById(1);
      if (product != null) {
        console.log(product);
      }
  
      const newProduct = {
        title: "Lapicera",
        price: 15.5,
        thumbnail:
          "https://cdn0.iconfinder.com/data/icons/education-1006/32/pen_design_office_vector_business_pencil_write_sign_stationery_graphic-128.png",
      };
  
      await file.saveProduct(newProduct);
      products = await file.getAll();
      console.log(products);
  
      try {
        await file.deleteById(3);
        products = await file.getAll();
        console.log(products);
      } catch (error) {
        console.log(error);
      }
  
      await file.deleteAll();
      products = await file.getAll();
      console.log(products);
    } catch (error) {
      console.log("Problemas!!!", error);
    }
  };
  
  master();
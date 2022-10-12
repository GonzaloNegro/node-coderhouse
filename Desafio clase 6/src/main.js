const express = require('express');
const fs = require('fs');

const app = express();

const PORT = 8080;

const productsFile = '../productos.json';

class Contenedor {

    constructor(nameJson) {
        this.nameJson = nameJson
    }

    async validateData() {
        const exits = await fs.promises.stat(this.nameJson)
        !exits ? await fs.promises.writeFile(this.nameJson, JSON.stringify(['Error 404'])) : null
    }

    async getProducts() {
        await this.validateData()
        const data = await fs.promises.readFile(this.nameJson, 'utf-8')
        return JSON.parse(data)
    }

    async log() {
        const products = await this.getProducts()
        console.log(products)
    }

    async save(data) {
        if (!data.title || !data.price || typeof data.title !== 'string' || typeof data.price !== 'number') throw new Error('Datos Invalidos')

        const products = await this.getProducts()

        const newProduct = {
            title: data.title,
            price: data.price,
            id: products[products.length -1].id + 1
        }

        products.push(newProduct)

        await this.saveProducts(products)
    }

    async saveProducts(products) {
        const data = JSON.stringify(products, null , '\t')
        await fs.promises.writeFile(this.nameJson, data)
    }

    async getById(idBuscado) {
        const products = await this.getProducts()

        const index = products.findIndex((product) => product.id === idBuscado)

        if (index < 0) throw new Error('El producto no existe')

        return products[index]
    }

    async getAll() {
        const products = await this.getProducts()
        return products
    }

    async deleteById(idDeleted) {
        const products = await this.getProducts()

        const index = products.findIndex((product) => product.id === idDeleted);

        if (index < 0) return;

        products.splice(index,1)
        
        await this.saveProducts(products)
    }

}

const contenedor = new Contenedor(productsFile);

let visitas = 0
app.get('/', (req, res) => {
    visitas++
    res.send(`Bienvenido - Cantidad de visitas a la web ${visitas}`)
});

app.get('/productos', async (req, res) => {
    const products = await contenedor.getAll()
    const showProducts = products.map((product) => {
        return `Producto: ${product.title} - Precio: ${product.price} - ID: ${product.id}   `
    })
    res.send(showProducts)
});

const idRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

app.get('/productos/:id', async (req, res) => {
    const id = idRandom(1,4)
    const product = await contenedor.getById(id)
    const showProduct = `Producto: ${product.title} - Precio: ${product.price} - ID: ${product.id}`
    res.send(showProduct)
});

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});
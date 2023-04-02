import { asDto } from "../dto/products.dto.js";
import { getDao } from "../daos/factory.js";

export default class ProductsRepository {
    constructor() {
        this.dao = getDao();
    }

    async save(prod) {
        const product = await this.dao.save(prod);
        return product;
    }

    async getAll() {
        const products = await this.dao.getAll();
        const prodsDTO = asDto(products);
        console.log(prodsDTO);
        return prodsDTO;
    }

    async getById(id) {
        const getProd = await this.dao.getById(id);
        const prodAsDto = asDto(getProd);
        return prodAsDto;
    }

    async updateProd(id, data) {
        const updateProd = await this.dao.updateProd(id, data);
        return updateProd;
    }

    async deleteProd(id) {
        const deleteProd = await this.dao.deleteProd(id);
        const deletedProdAsDto = asDto(deleteProd);
        return deletedProdAsDto;
    }
}

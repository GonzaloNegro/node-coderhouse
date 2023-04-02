import ProductsRepository from "../persistence/repository/products.repository.js";

const productsRepository = new ProductsRepository();

export const saveProduct = async (product) => {
    const prod = await productsRepository.save(product)
    return prod;
};

export const getAllProducts = async () => {
    const products = await productsRepository.getAll();
    return products;
};

export const getById = async (id) => {
    const getProd = await productsRepository.getById(id);
    return getProd;
};

export const updateProd = async (id, data) => {
    const updateProd = await productsRepository.updateProd(id, data);
    return updateProd;
};

export const deleteProd = async (id) => {
    const deleteProd = await productsRepository.deleteProd(id);
    return deleteProd;
};
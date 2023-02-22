import ProductsRepository from "../persistence/repository/products.repository.js";

const productsRepository = new ProductsRepository();

export async function saveProduct(product) {
  const prod = await productsRepository.save(product);
  return prod;
}

export async function getAllProducts() {
  const products = await productsRepository.getAll();
  return products;
}

export async function updateProductById(
  id,
  title,
  description,
  code,
  photo,
  value,
  stock
) {
  const prod = await productsRepository.updateProductById(
    id,
    title,
    description,
    code,
    photo,
    value,
    stock
  );
  return prod;
}

export async function deleteProductById(id) {
  const prod = await productsRepository.deleteProductById(id);
  return prod;
}

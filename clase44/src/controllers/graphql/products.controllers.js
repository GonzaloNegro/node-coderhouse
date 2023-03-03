import {
  saveProduct,
  getAllProducts,
  updateProductById,
  deleteProductById,
} from "../../services/rest/products.services.js";

export async function saveProductController({ data }) {
  const productObj = { ...data };
  const newProdcut = await saveProduct(productObj);
  return newProdcut;
}

export async function getAllProductsController() {
  const allProdcuts = await getAllProducts();
  return allProdcuts;
}

export async function updateProductByIdController(data) {
  const { id, title, description, code, photo, value, stock } = data;
  const product = await updateProductById(
    id,
    title,
    description,
    code,
    photo,
    value,
    stock
  );
  return product;
}

export async function deleteProductByIdController(args) {
  const { id } = args;
  const product = await deleteProductById(id);
  return product;
}

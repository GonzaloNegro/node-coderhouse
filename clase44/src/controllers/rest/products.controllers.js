import {
  saveProduct,
  getAllProducts,
  updateProductById,
  deleteProductById,
} from "../../services/rest/products.services.js";

export const saveController = async (req, res) => {
  const { body } = req;
  try {
    const product = await saveProduct(body);
    res.json(product);
  } catch (error) {
    console.log(error);
  }
};

export const getAllController = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

export const updateProductByIdController = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, description, code, photo, value, stock } = req.body;
    const product = await updateProductById(
      id,
      title,
      description,
      code,
      photo,
      value,
      stock
    );
    res.json(product);
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductByIdController = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await deleteProductById(id);
    res.json(product);
  } catch (error) {
    console.log(error);
  }
};

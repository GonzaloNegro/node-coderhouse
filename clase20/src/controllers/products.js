import { ProductsModel } from "../models/products.js";
import { validationResult } from "express-validator";
import { formatTimeStamp } from "../utils/format.js";
import { findLastProductId } from "../utils/utils.js";

export const getAllProducts = async (req, res) => {
  try {
    let products = await ProductsModel.find();
    res.status(200).json({
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    if (isNaN(req.params.id)) {
      return res.status(400).json({
        error: "Tiene que ingresar un id válido!",
      });
    }
    const id = parseInt(req.params.id);
    let product = await ProductsModel.findOne({ id: id });
    if (!product) {
      return res.status(404).json({
        mensaje: "Producto no encontrado!",
      });
    } else {
      return res.status(200).json({
        data: product,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, code, photo, value, stock } = req.body;

    let lastId = await findLastProductId();
    let newId = lastId + 1;
    let id = newId;
    let timestamp = formatTimeStamp();

    const newProduct = await ProductsModel.create({
      id,
      timestamp,
      title,
      description,
      code,
      photo,
      value,
      stock,
    });
    return res.status(201).json({
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const updateProductById = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    if (isNaN(req.params.id)) {
      return res.status(400).json({
        error: "Tiene que ingresar un id válido!",
      });
    }

    const id = parseInt(req.params.id);
    const { title, description, code, photo, value, stock } = req.body;

    let product = await ProductsModel.findOne({ id: id });

    if (!product) {
      return res.status(404).json({
        mensaje: "Producto no encontrado!",
      });
    } else {
      const productUpdated = await ProductsModel.findByIdAndUpdate(
        product._id,
        { title, description, code, photo, value, stock },
        { new: true }
      );
      return res.status(200).json({
        mensaje: "producto actualizado con exito",
        data: productUpdated,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const deleteProductById = async (req, res) => {
  try {
    if (isNaN(req.params.id)) {
      return res.status(400).json({
        error: "Tiene que ingresar un id válido!",
      });
    }
    const id = parseInt(req.params.id);

    let product = await ProductsModel.findOne({ id: id });

    if (!product) {
      return res.status(404).json({
        mensaje: "Producto no encontrado!",
      });
    } else {
      await ProductsModel.findByIdAndDelete(product._id);
      return res.status(200).json({
        mensaje: "producto eliminado con exito",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

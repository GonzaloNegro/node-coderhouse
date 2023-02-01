import { ProductModel } from "../models/product.model.js";
import { CartModel } from "../models/cart.model.js";

export const findLastProductId = async () => {
  let lastDocument = await ProductModel.findOne().sort({ id: -1 }).limit(1);
  let lastId = lastDocument.id;
  return lastId;
};

export const findLastCartId = async () => {
  let lastDocument = await CartModel.findOne().sort({ id: -1 }).limit(1);
  let lastId = lastDocument.id;
  return lastId;
};

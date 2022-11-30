import { ProductsModel } from "../models/products.js";
import { CartsModel } from "../models/cart.js";

export const findLastProductId = async () => {
  let lastDocument = await ProductsModel.findOne().sort({ id: -1 }).limit(1);
  let lastId = lastDocument.id;
  return lastId;
};

export const findLastCartId = async () => {
  let lastDocument = await CartsModel.findOne().sort({ id: -1 }).limit(1);
  let lastId = lastDocument.id;
  return lastId;
};

import mongoose from "mongoose";
import { productSchema } from "./product.model.js";

export const cartCollectionName = "carritos";

export const cartSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  timestamp: { type: String, required: true },
  username: { type: String, required: true },
  name: { type: String, required: true },
  products: { type: [productSchema], required: true },
  closed: { type: Boolean, required: true },
});

export const CartModel = mongoose.model(cartCollectionName, cartSchema);

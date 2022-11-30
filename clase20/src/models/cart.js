import mongoose from "mongoose";
import { productsSchema } from "./products.js";

export const cartCollectionName = "carritos";

export const cartsSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  timestamp: { type: String, required: true },
  products: { type: [productsSchema], required: true },
});

export const CartsModel = mongoose.model(cartCollectionName, cartsSchema);

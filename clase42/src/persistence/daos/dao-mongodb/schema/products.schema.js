import mongoose from "mongoose";

export const productsSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  timestamp: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  photo: { type: String, required: true },
  value: { type: Number, required: true },
  stock: { type: Number, required: true },
});

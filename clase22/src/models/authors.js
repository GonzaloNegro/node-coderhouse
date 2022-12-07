import mongoose from "mongoose";

export const authorsCollectionName = "autores";

export const authorsSchema = new mongoose.Schema({
  id: { type: String, required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  edad: { type: String, required: true },
  alias: { type: String, required: true },
  avatar: { type: String, required: true },
});

export const ProductsModel = mongoose.model(
  authorsCollectionName,
  authorsSchema
);

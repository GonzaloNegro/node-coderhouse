import mongoose from "mongoose";
import { authorsSchema } from "./authors.js";

export const messagesCollectionName = "mensajes";

export const messagesSchema = new mongoose.Schema({
  author: { type: authorsSchema, required: true },
  text: { type: String, required: true },
});

export const MessagesModel = mongoose.model(
  messagesCollectionName,
  messagesSchema
);

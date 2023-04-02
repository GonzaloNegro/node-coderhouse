import mongoose from "mongoose";

export const productsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    description: { type: String, required: true }
}, {
    versionKey: false
});

export const productsModel = mongoose.model('products', productsSchema)
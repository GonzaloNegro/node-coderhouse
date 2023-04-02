import { Schema, model } from 'mongoose';

const cartCollection = 'carts';

const CartSchema = new Schema(
    { productos: { type: Array } },
    { timestamps: true }
);

const CartModel = model(cartCollection, CartSchema);

export default CartModel;
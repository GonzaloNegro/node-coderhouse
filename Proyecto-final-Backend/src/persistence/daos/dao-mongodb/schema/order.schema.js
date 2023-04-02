import { Schema, model } from 'mongoose';

const orderCollection = 'orders';

const OrderSchema = new Schema({
    user: { type: String, required: true },
    productos: { type: Array, required: true },
},
{ timestamps: true }
);

const OrderModel = model(orderCollection, OrderSchema);

export default OrderModel;
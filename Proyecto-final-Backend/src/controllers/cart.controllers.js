import CartModel from '../persistence/daos/dao-mongodb/schema/cart.schema.js';
import { v4 as uuidv4 } from 'uuid';
import { UserModel } from '../persistence/daos/dao-mongodb/schema/users.schema.js';
import OrderModel from '../persistence/daos/dao-mongodb/schema/order.schema.js'
import { buyCartGmail } from '../controllers/email.controllers.js';
import {logger} from '../helpers/log4js.js'



export const createCart = async (req, res) => {

    const nuevoCart = {
        productos: []
    }

    try {
        await CartModel.create(nuevoCart)

        res.json({
            msg: `Nuevo carrito creado`
        });
    } catch (error) {
        logger.info("Error al crear carrito", error);
    }
};

const saveOrder = async (id, user) => {

    try {

        const cart = await CartModel.findById(id);
        const data = JSON.stringify(cart.productos, null, "\t");

        const nuevaOrder = {
            user: user,
            productos: data
        }
        await OrderModel.create(nuevaOrder)

    } catch (error) {
        logger.info("Error al guardar orden", error);
    }
};

export const deleteCart = async (req, res) => {

    const id = req.params.id;

    try {
        await CartModel.findByIdAndDelete(id)
        res.json({
            msg: `Cart eliminado`
        });
    } catch (error) {
        logger.info("Error al eliminar carrito", error);
    }
};

export const getCartById = async (req, res) => {

    const id = req.params.id;

    try {
        const cart = await CartModel.findById(id);
        logger.info(cart);
        res.json({
            msg: cart
        });
    } catch (error) {
        logger.info("Error al traer carrito por id", error);
    }
};

export const addProduct = async (req, res) => {

    const id = req.params.id;
    const { body } = req;

    const nuevoProducto =
    {
        $push: {
            productos: {
                id: uuidv4(),
                name: body.name,
                price: body.price,
                stock: body.stock,
            }
        }
    };

    try {
        await CartModel.findByIdAndUpdate(id, nuevoProducto);
        res.json({
            msg: `Agregue un producto al carrito`
        });
    } catch (error) {
        logger.info("Error al agregar producto al carrito", error);
    }
};

export const deleteProduct = async (req, res) => {

    const idCart = req.params.id;
    const idProduct = req.params.id_prod;
    console.log( idCart, idProduct);

    try {
        const cart = await CartModel.findById(idCart);
        console.log(cart)
        const indiceProducto = cart.productos.findIndex(prodId => prodId.id === idProduct);

        cart.productos.splice(indiceProducto, 1);

        await CartModel.findByIdAndUpdate(idCart, cart);

        res.json({
            msg: `Elimine el producto con ID ${idProduct}`
        });
    } catch (error) {
        logger.info("Error al eliminar producto del carrito", error);
    }
};

export const buyCart = async (req, res) => {

    const id = req.params.id;

    try {
        const cart = await CartModel.findById(id);
        const data = JSON.stringify(cart.productos, null, "\t")

        const user = await UserModel.findById(req.session.passport.user);

        buyCartGmail(data, user.username);
        saveOrder(id, user);

        res.json({
            msg: `Pedido enviado!`
        });

    } catch (error) {
        logger.info("Error al realizar pedido", error);
    }

};
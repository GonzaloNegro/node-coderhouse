import { CartModel } from "../models/cart.model.js";
import { ProductModel } from "../models/product.model.js";
import { validationResult } from "express-validator";
import { formatTimeStamp } from "../utils/format.js";
import { findLastCartId } from "../utils/utils.js";
import { actualUser } from "../services/auth.js";
import { sendUserFinishBuyMail } from "../mail/mail.js";
import { sendSms, sendWS } from "../sms/sms.js";

let username;
let name;

export const getProductsInCart = async (req, res) => {
  username = actualUser.username;
  name = actualUser.name;
  try {
    if (isNaN(req.params.id)) {
      return res.status(400).json({
        error: "Tiene que enviar un id válido!",
      });
    }
    const id = parseInt(req.params.id);
    const cart = await CartModel.findOne({ id: id });

    if (!cart) {
      return res.status(404).json({
        mensaje: "Carrito no encontrado!",
      });
    } else {
      if (username == cart.username) {
        return res.status(200).json({
          data: cart,
        });
      } else {
        return res.status(403).json({
          msg: "No tiene permisos de acceso!",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const createCart = async (req, res) => {
  try {
    let lastId = await findLastCartId();
    let newId = lastId + 1;
    let id = newId;
    let timestamp = formatTimeStamp();
    let products = [];
    let username = actualUser.username;
    let name = actualUser.name;
    let closed = false;

    await CartModel.create({
      id,
      timestamp,
      username,
      name,
      products,
      closed,
    });

    return res.status(201).json({
      mensaje: `carrito ${newId} creado con exito`,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const addProductsToCart = async (req, res) => {
  username = actualUser.username;
  name = actualUser.name;
  try {
    if (isNaN(req.params.id)) {
      return res.status(400).json({
        error: "Tiene que enviar un id de carrito válido!",
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    const cartId = parseInt(req.params.id);
    const productId = parseInt(req.body.id);

    let cart = await CartModel.findOne({ id: cartId });

    if (!cart) {
      return res.status(404).json({
        mensaje: "Carrito no encontrado!",
      });
    }

    if (username != cart.username) {
      return res.status(403).json({
        msg: "No tiene permisos de acceso!",
      });
    }

    if (cart.closed == true) {
      return res.status(400).json({
        msg: "ya se realizo la compra, no se pueden agregar productos a este carrito!",
      });
    }

    let product = await ProductModel.findOne({ id: productId });

    if (!product) {
      return res.status(404).json({
        mensaje: "Producto no encontrado!",
      });
    } else {
      if (product.stock <= 0) {
        return res.status(404).json({
          mensaje: "Producto sin stock!",
        });
      }

      let products = cart.products;
      products.push(product);

      const productAddedToCart = await CartModel.findByIdAndUpdate(
        cart._id,
        { products },
        { new: true }
      );

      const productUpdated = await ProductModel.findByIdAndUpdate(product._id, {
        tile: product.title,
        description: product.description,
        code: product.code,
        photo: product.photo,
        value: product.value,
        stock: product.stock - 1,
      });

      return res.status(201).json({
        mensaje: "producto agregado al carrito con exito",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const deleteCartById = async (req, res) => {
  username = actualUser.username;
  name = actualUser.name;
  try {
    if (isNaN(req.params.id)) {
      return res.status(400).json({
        error: "Tiene que enviar un id válido!",
      });
    }
    const id = parseInt(req.params.id);
    let cart = await CartModel.findOne({ id: id });

    if (!cart) {
      return res.status(404).json({
        mensaje: "carrito no encontrado!",
      });
    } else {
      if (username != cart.username) {
        return res.status(403).json({
          msg: "No tiene permisos de acceso!",
        });
      } else {
        if (cart.closed == true) {
          return res.status(400).json({
            msg: "ya se realizo la compra, no se puede eliminar este carrito!",
          });
        }

        await CartModel.findByIdAndDelete(cart._id);
        return res.status(200).json({
          mensaje: "carrito eliminado con exito",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const deleteProductInCartById = async (req, res) => {
  username = actualUser.username;
  name = actualUser.name;
  try {
    if (isNaN(req.params.id) || isNaN(req.params.id_prod)) {
      return res.status(400).json({
        error: "Tiene que enviar parámetros válidos!",
      });
    }
    const cartId = parseInt(req.params.id);
    const productId = parseInt(req.params.id_prod);

    let cart = await CartModel.findOne({ id: cartId });

    if (!cart) {
      return res.status(404).json({
        mensaje: "Carrito no encontrado!",
      });
    }

    if (username != cart.username) {
      return res.status(403).json({
        msg: "No tiene permisos de acceso!",
      });
    }

    if (cart.closed == true) {
      return res.status(400).json({
        msg: "ya se realizo la compra, no se pueden eliminar productos de este carrito!",
      });
    }

    let productExists = cart.products.find((item) => item.id == productId);

    if (!productExists) {
      return res.status(404).json({
        mensaje: "Producto no encontrado!",
      });
    } else {
      let products = cart.products;
      const filteredProducts = products.filter((item) => item.id !== productId);
      products = filteredProducts;

      let productsFull = cart.products.length;
      let productsCut = products.length;
      let diff = productsFull - productsCut;

      const productAddedToCart = await CartModel.findByIdAndUpdate(cart._id, {
        products,
      });

      let productToStock = await ProductModel.findOne({ id: productId });

      const productUpdated = await ProductModel.findByIdAndUpdate(
        productToStock._id,
        {
          id: productToStock.id,
          timestamp: productToStock.timestamp,
          title: productToStock.title,
          description: productToStock.description,
          code: productToStock.code,
          photo: productToStock.photo,
          value: productToStock.value,
          stock: productToStock.stock + diff,
        }
      );

      return res.status(201).json({
        mensaje: "producto eliminado del carrito con exito",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const finishOrder = async (req, res) => {
  username = actualUser.username;
  name = actualUser.name;
  try {
    if (isNaN(req.params.id)) {
      return res.status(400).json({
        error: "Tiene que enviar un id de carrito válido!",
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    const cartId = parseInt(req.params.id);

    let cart = await CartModel.findOne({ id: cartId });

    if (!cart) {
      return res.status(404).json({
        mensaje: "Carrito no encontrado!",
      });
    }

    if (username != cart.username) {
      return res.status(403).json({
        msg: "No tiene permisos de acceso!",
      });
    }

    if (cart.closed == true) {
      return res.status(400).json({
        msg: "ya se realizo la compra!",
      });
    }

    const finishCart = await CartModel.findByIdAndUpdate(cart._id, {
      id: cart.id,
      timestamp: cart.timestamp,
      username: cart.username,
      name: cart.name,
      products: cart.products,
      closed: true,
    });

    await sendUserFinishBuyMail(username, name, cart.products);
    await sendSms(actualUser.phone);
    await sendWS(actualUser);

    return res.status(200).json({
      mensaje: "compra realizada con éxito!",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

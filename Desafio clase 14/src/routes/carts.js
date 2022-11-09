import express from "express";
const router = express.Router();
import Cart from "../classes/cart.js";
import Product from "../classes/product.js";
import { body, validationResult } from "express-validator";

const cartFileName = "cart.json";
const cartObj = new Cart(cartFileName);
const productFileName = "products.json";
const productObj = new Product(productFileName);

router.get("/:id/productos", async (req, res) => {
  try {
    if (isNaN(req.params.id)) {
      return res.status(400).json({
        error: "Tiene que enviar un id válido!",
      });
    }
    const id = parseInt(req.params.id);
    const productsCart = await cartObj.getCartById(id);
    return res.status(200).json({
      productsCart,
    });
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    await cartObj.createCart();
    const carts = await cartObj.getAllProductsInCart();
    let idLastCartAdded = carts[carts.length - 1].id;
    return res.status(201).json({
      msg: `carrito ${idLastCartAdded} creado con exito`,
    });
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
});

router.post(
  "/:id/productos",
  body("id").not().isEmpty().isInt({ min: 1 }),
  async (req, res) => {
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
      const cartSelected = await cartObj.getCartById(cartId);
      const productToAdd = await productObj.getById(productId);
      await cartObj.AddNewProductToCart(cartSelected.id, productToAdd);
      return res.status(201).json({
        msg: "producto agregado al carrito con exito",
      });
    } catch (error) {
      if (error.index) {
        return res.status(404).json({
          error: error.msg,
        });
      } else {
        return res.status(400).json({
          error: error,
        });
      }
    }
  }
);

router.delete("/:id", async (req, res) => {
  try {
    if (isNaN(req.params.id)) {
      return res.status(400).json({
        error: "Tiene que enviar un id válido!",
      });
    }
    const id = parseInt(req.params.id);
    await cartObj.deleteById(id);
    return res.status(200).json({
      msg: "carrito eliminado con exito",
    });
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
});

router.delete("/:id/productos/:id_prod", async (req, res) => {
  try {
    if (isNaN(req.params.id) || isNaN(req.params.id_prod)) {
      return res.status(400).json({
        error: "Tiene que enviar parámetros válidos!",
      });
    }
    const cartId = parseInt(req.params.id);
    const productId = parseInt(req.params.id_prod);
    //Esto solo sirve para saber si existe el carrito solicitado o no
    const cart = await cartObj.getCartById(cartId);
    await cartObj.deleteProductInCartById(cartId, productId);
    return res.status(200).json({
      msg: "producto eliminado del carrito con exito",
    });
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
});

export default router;
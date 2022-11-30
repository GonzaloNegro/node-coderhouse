import { Router } from "express";
const router = Router();
import {
  getProductsInCart,
  createCart,
  addProductsToCart,
  deleteCartById,
  deleteProductInCartById,
} from "../controllers/cart.js";
import { body } from "express-validator";

router.get("/:id/productos", getProductsInCart);
router.post("/", createCart);
router.post(
  "/:id/productos",
  body("id").not().isEmpty().isInt({ min: 1 }),
  addProductsToCart
);
router.delete("/:id", deleteCartById);
router.delete("/:id/productos/:id_prod", deleteProductInCartById);

export default router;

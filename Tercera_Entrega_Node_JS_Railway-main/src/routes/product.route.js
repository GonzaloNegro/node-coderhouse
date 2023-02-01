import { Router } from "express";
const router = Router();
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
} from "../controllers/product.controller.js";
import { body } from "express-validator";
import { isLoggedIn } from "../middlewares/user.middleware.js";

router.get("/", isLoggedIn, getAllProducts);

router.get("/:id", isLoggedIn, getProductById);

router.post(
  "/",
  isLoggedIn,
  body("title").not().isEmpty().isString().trim().escape(),
  body("description").not().isEmpty().isString().trim().escape(),
  body("code").not().isEmpty().isString().trim().escape(),
  body("photo").not().isEmpty().isString().trim(),
  body("value").not().isEmpty().isDecimal({ min: 1.0 }),
  body("stock").not().isEmpty().isInt({ min: 1 }),
  createProduct
);

router.put(
  "/:id",
  isLoggedIn,
  body("title").not().isEmpty().isString().trim().escape(),
  body("description").not().isEmpty().isString().trim().escape(),
  body("code").not().isEmpty().isString().trim().escape(),
  body("photo").not().isEmpty().isString().trim(),
  body("value").not().isEmpty().isDecimal({ min: 1.0 }),
  body("stock").not().isEmpty().isInt({ min: 1 }),
  updateProductById
);

router.delete("/:id", isLoggedIn, deleteProductById);

export default router;

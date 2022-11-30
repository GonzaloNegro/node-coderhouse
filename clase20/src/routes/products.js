import { Router } from "express";
const router = Router();
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
} from "../controllers/products.js";
import { body } from "express-validator";

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.post(
  "/",
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
  body("title").not().isEmpty().isString().trim().escape(),
  body("description").not().isEmpty().isString().trim().escape(),
  body("code").not().isEmpty().isString().trim().escape(),
  body("photo").not().isEmpty().isString().trim(),
  body("value").not().isEmpty().isDecimal({ min: 1.0 }),
  body("stock").not().isEmpty().isInt({ min: 1 }),
  updateProductById
);

router.delete("/:id", deleteProductById);

export default router;

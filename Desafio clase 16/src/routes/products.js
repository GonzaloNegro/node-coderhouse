import express from "express";
const router = express.Router();
import { createProductController } from "../controllers/controllers.products.js";
import { body } from "express-validator";

router.post(
  "/",
  body("title").not().isEmpty().isString().trim().escape(),
  body("value").not().isEmpty().isInt({ min: 1 }),
  body("thumbnail").not().isEmpty().isString().trim(),
  createProductController
);

export default router;
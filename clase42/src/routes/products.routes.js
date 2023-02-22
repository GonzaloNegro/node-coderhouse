import { Router } from "express";
import {
  saveController,
  getAllController,
  updateProductByIdController,
  deleteProductByIdController,
} from "../controllers/products.controllers.js";

const router = Router();

router.post("/add", saveController);
router.get("/list", getAllController);
router.put("/:id", updateProductByIdController);
router.delete("/:id", deleteProductByIdController);

export default router;

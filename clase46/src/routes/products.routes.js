import Router from "koa-router";
import {
  saveController,
  getAllController,
  updateProductByIdController,
  deleteProductByIdController,
} from "../controllers/products.controllers.js";

const router = new Router({
  prefix: "/products",
});

router.post("/add", saveController);
router.get("/list", getAllController);
router.put("/:id", updateProductByIdController);
router.delete("/:id", deleteProductByIdController);

export default router.routes();

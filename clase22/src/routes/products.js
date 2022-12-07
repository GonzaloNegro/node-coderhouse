import { Router } from "express";
const router = Router();
import { getAllProducts } from "../controllers/products.js";

router.get("/fackerMock", getAllProducts);

export default router;

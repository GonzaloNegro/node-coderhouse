import Router from "express";
import productsRouter from "./products.js";

const router = Router();

router.use("/productos", productsRouter);

export default router;
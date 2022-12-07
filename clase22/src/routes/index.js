import Router from "express";
import productsRouter from "./products.js";
import messagesRouter from "./messages.js";

const router = Router();

router.use("/productos", productsRouter);
router.use("/mensajes", messagesRouter);

export default router;

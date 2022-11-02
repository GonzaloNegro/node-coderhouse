const { Router } = require("express");
const productsRouter = require("./products");

const router = Router();

router.use("/productos", productsRouter);

module.exports = router;
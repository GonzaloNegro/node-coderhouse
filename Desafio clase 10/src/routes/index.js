const { Router } = require("express");
const productoRouter = require("./producto");

const router = Router();

router.use("/productos", productoRouter);

module.exports = router;
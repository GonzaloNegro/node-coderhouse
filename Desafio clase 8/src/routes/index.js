const { Router } = require("express");

/* RECURSO CON SU RUTA */
const productoRouter = require("./producto");

const router = Router();

/* TODO LO QUE EMPIECE CON /productos lo maneja el productoRouter */
router.use("/productos", productoRouter);


module.exports = router;
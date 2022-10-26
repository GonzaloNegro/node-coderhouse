const express = require("express");
const router = express.Router();
const Producto = require("../clases/Producto");
const { body, validationResult } = require("express-validator");

const arrayProductos = [
  new Producto(
    1,
    "auto",
    100,
    "https://img.freepik.com/vector-premium/ilustracion-dibujos-animados-sedan-azul-coche-generico-objeto-color-vehiculo-transporte-auto-contemporaneo-transporte-personal-moderno-automovil-urbano-sobre-fondo-blanco_151150-2409.jpg?w=2000"
  ),
  new Producto(
    2,
    "moto",
    200,
    "https://img.freepik.com/vector-gratis/ilustracion-motocicleta-color-rojo_1308-35859.jpg?w=2000&t=st=1665714076~exp=1665714676~hmac=154aad3cdb7fd71c793d80f3a85f905f4ec3d551e93fadf10ba36286b201b786"
  ),
  new Producto(
    3,
    "camion",
    300,
    "https://img.freepik.com/vector-gratis/camion-reparto-caja-grande_1284-44424.jpg?w=1380&t=st=1665714104~exp=1665714704~hmac=a0717b4f1a05e301cfa488e81b49862f6e50af715786b469f3e42ac27012fd2a"
  ),
];

const productoObj = new Producto();

router.post(
  "/",
  body("titulo").not().isEmpty().isString().trim().escape(),
  body("precio").not().isEmpty().isInt({ min: 1 }),
  body("miniatura").not().isEmpty().isString().trim(),
  (req, res) => {
    try {
      const errores = validationResult(req);
      if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
      }

      const body = req.body;

      let producto = productoObj.saveProduct(body, arrayProductos);
      res.redirect("/");
    } catch (error) {
      return res.status(400).json({
        error: error,
      });
    }
  }
);

router.get("/", (req, res) => {
  let cantidad = arrayProductos.length;
  let hayProductos = cantidad == 0 ? false : true;
  res.render("vistaProductos", { arrayProductos, hayProductos });
});

module.exports = router;
const express = require("express");
const router = express.Router();
const Producto = require("../clases/Producto");
const { body, validationResult } = require("express-validator");

const arrayProductos = [
  new Producto(
    1,
    "plato",
    150,
    "https://img.freepik.com/free-photo/cutlery-overhead-wooden-dining-food_1203-6082.jpg?w=1380&t=st=1666216234~exp=1666216834~hmac=c586a221aa7f3c79c2fec446712597248ca6b007899efde4e3865bec6170c042"
  ),
  new Producto(
    2,
    "cubiertos",
    300,
    "https://img.freepik.com/free-vector/realistic-fork-spoon-silver-kitchen-stainless-utensil-set_33099-145.jpg?w=826&t=st=1666216292~exp=1666216892~hmac=577ee48ef84fa138531ac76c1c3bb14ae30256e72a0af54a6f7894afd106bab0"
  ),
  new Producto(
    3,
    "ollas",
    1500,
    "https://img.freepik.com/free-vector/hot-pot-saucepan-pan-gas-stove-flat-set_74855-14426.jpg?w=1380&t=st=1666216329~exp=1666216929~hmac=da070fe80cd1d0b04876cd1b99b9b808a00644657683aaa091d2a80c967c0f18"
  ),
];

const productoObj = new Producto();

router.get("/", (req, res) => {
  res.status(200).json({
    arrayProductos,
  });
});

router.get("/:id", (req, res) => {
  try {
    if (isNaN(req.params.id)) {
      return res.status(400).json({
        error: "Por favor ingrese un id válido!",
      });
    }
    const id = parseInt(req.params.id);
    const producto = productoObj.getById(id, arrayProductos);
    return res.status(200).json({
      producto,
    });
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
});

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
      return res.status(201).json({
        producto,
      });
    } catch (error) {
      return res.status(400).json({
        error: error,
      });
    }
  }
);

router.put(
  "/:id",
  body("titulo").not().isEmpty().isString().trim().escape(),
  body("precio").not().isEmpty().not().isString().trim().escape(),
  body("miniatura").not().isEmpty().isString().trim().escape(),
  (req, res) => {
    try {
      const errores = validationResult(req);
      if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
      }

      if (isNaN(req.params.id)) {
        return res.status(400).json({
          error: "Por favor ingrese un id válido!",
        });
      }

      const id = parseInt(req.params.id);
      const body = req.body;

      productoObj.updateProduct(id, body, arrayProductos);
      return res.status(200).json({
        body,
      });
    } catch (error) {
      return res.status(400).json({
        error: error,
      });
    }
  }
);

router.delete("/:id", (req, res) => {
  try {
    if (isNaN(req.params.id)) {
      return res.status(400).json({
        error: "Por favor ingrese un id válido!",
      });
    }
    const id = parseInt(req.params.id);
    productoObj.deleteById(arrayProductos, id);
    return res.status(200).json({
      arrayProductos,
    });
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
});

module.exports = router;
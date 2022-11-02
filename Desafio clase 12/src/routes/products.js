const express = require("express");
const router = express.Router();
const { productObj, productArray } = require("../classes/product");
const { body, validationResult } = require("express-validator");

router.post(
  "/",
  body("title").not().isEmpty().isString().trim().escape(),
  body("value").not().isEmpty().isInt({ min: 1 }),
  body("thumbnail").not().isEmpty().isString().trim(),
  (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const body = req.body;

      productObj.saveProduct(body, productArray);
      return res.status(200).json({ msg: "Producto Agregado!" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: error,
      });
    }
  }
);

module.exports = router;
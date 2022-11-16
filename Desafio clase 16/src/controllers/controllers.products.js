import { createProductService } from "../services/services.products.js";
import { validationResult } from "express-validator";

export const createProductController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, value, thumbnail } = req.body;

    const data = {
      title,
      value,
      thumbnail,
    };

    const newProduct = await createProductService(data);

    res.status(201).json({
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};
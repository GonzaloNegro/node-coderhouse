import { infoLogger } from "../logs/index.js";

export const uploadImage = async (req, res) => {
  try {
    infoLogger.info(req.file);
    res.send(req.file);
  } catch (error) {
    res.status(400).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

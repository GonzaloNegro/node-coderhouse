import { infoLogger } from "../logs/index.js";

export const isLoggedIn = (req, res, next) => {
  infoLogger.info(req.isAuthenticated());
  if (!req.isAuthenticated())
    return res.status(401).json({ msg: "No autorizado!" });
  next();
};

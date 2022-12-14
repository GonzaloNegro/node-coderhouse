import { Router } from "express";
const router = Router();
import {
  logout,
  infoSession,
  loginPost,
  loginGet,
} from "../controllers/user.controllers.js";
import { validateLogIn } from "../middlewares/middlewares.js";

router.post("/login", loginPost);

router.get("/", loginGet);

router.get("/home", validateLogIn, infoSession);

router.get("/logout", logout);

export default router;

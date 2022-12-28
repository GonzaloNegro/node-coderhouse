import { Router } from "express";
const router = Router();
import { infoApi } from "../controllers/info.controller.js";

router.get("/info", infoApi);

export default router;

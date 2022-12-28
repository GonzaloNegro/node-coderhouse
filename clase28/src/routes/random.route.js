import { Router } from "express";
const router = Router();
import { Randomnumbers } from "../controllers/random.controller.js";

router.get("/randoms/:cant", Randomnumbers);

export default router;

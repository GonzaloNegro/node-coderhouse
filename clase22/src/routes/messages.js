import { Router } from "express";
const router = Router();
import {
  AllMessages,
  NormalizedMessages,
  DenormalizedMessages,
} from "../controllers/messages.js";

router.get("/todos", AllMessages);
router.get("/normalizados", NormalizedMessages);
router.get("/denormalizados", DenormalizedMessages);

export default router;

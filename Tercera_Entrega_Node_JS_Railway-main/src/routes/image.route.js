import { Router } from "express";
import multer from "multer";
import { uploadImage } from "../controllers/image.controller.js";
import { isLoggedIn } from "../middlewares/user.middleware.js";

const router = Router();

const upload = multer({ dest: "./public" });

router.post("/subir", isLoggedIn, upload.single("imagen"), uploadImage);

export default router;

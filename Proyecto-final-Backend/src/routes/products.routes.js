import { Router } from "express";
import { saveController, getAllController, getByIdController, updateProdController, deleteProdController } from "../controllers/products.controllers.js"
import { isLoggedIn } from '../middlewares/userAutenticated.js';

const router = Router();

router.get('/', isLoggedIn, getAllController);
router.get("/:id", isLoggedIn, getByIdController);
router.post('/add', isLoggedIn, saveController);
router.put('/:id', isLoggedIn, updateProdController);
router.delete('/:id', isLoggedIn, deleteProdController);

export default router;
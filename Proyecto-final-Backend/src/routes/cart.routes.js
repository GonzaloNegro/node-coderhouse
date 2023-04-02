import { Router } from'express';
import  {createCart, deleteCart, getCartById, addProduct, deleteProduct, buyCart} from'../controllers/cart.controllers.js';
import { isLoggedIn } from '../middlewares/userAutenticated.js';

const router = Router();

router.post('/', isLoggedIn, createCart);
router.delete('/:id', isLoggedIn, deleteCart);
router.get('/:id/products', isLoggedIn, getCartById);
router.post('/:id/products', isLoggedIn, addProduct);
router.delete('/:id/products/:id_prod', isLoggedIn, deleteProduct);
router.get('/:id/buy',  buyCart);

export default router;
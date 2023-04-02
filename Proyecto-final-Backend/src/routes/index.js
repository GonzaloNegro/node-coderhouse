import { Router } from'express';
import productsRouter from './products.routes.js';
import usersRouter from './users.routes.js'
import cartRouter from './cart.routes.js'
import chatRouter from './chat.routes.js'

const router = Router();

router.use('/products', productsRouter);
router.use('/users', usersRouter);
router.use('/cart', cartRouter);
router.use('/chat', chatRouter);

export default router;
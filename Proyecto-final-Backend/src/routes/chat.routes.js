import { Router } from 'express';
import { renderChat } from '../controllers/chat.controller.js';

const router = Router();

router.get('/', renderChat);

export default router;
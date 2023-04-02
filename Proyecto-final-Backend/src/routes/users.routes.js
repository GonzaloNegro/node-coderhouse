import { Router } from'express';
import { signUp, logIn, logOut, renderFront } from '../controllers/users.controllers.js'
import passport from 'passport';


const passportOptions = { badRequestMessage: 'Error en el body' };

const router = Router();

router.get('/', renderFront);
router.post('/signUp', signUp);
router.post('/logIn', passport.authenticate( 'logIn', passportOptions), logIn);
router.get('/logout', logOut);

export default router;
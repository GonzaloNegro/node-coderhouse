import passport from 'passport';
import { newUserGmail } from '../controllers/email.controllers.js';
import {logger} from '../helpers/log4js.js'

const passportOptions = { badRequestMessage: 'falta username / password' };

export const renderFront = async (req, res) => {

    try {
        res.render('login');

    } catch (error) {
        logger.info("Error al mostrar form", error);
    }
};

export const signUp = (req, res, next) => {
    passport.authenticate('signUp', passportOptions, (err, user, info) => {
        if (err) {
            return next(err)
        }
        if (!user) return res.status(401).json(info);
        newUserGmail(user.username)
        res.json({ msg: 'signup OK' })
    })(req, res, next);
}

export const logIn = (req, res) => {

    res.json({ msg: `Bienvenido ${req.user.username}`, user: req.user });
}

export const logOut = (req, res, next) => {

    req.logout(function (err) {
        if (err) { return next(err) };
        res.send(`Hasta luego!`);
    });

}
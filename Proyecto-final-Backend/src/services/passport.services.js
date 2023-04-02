import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserModel } from "../persistence/daos/dao-mongodb/schema/users.schema.js";
import {logger} from '../helpers/log4js.js'

const strategyOptions = {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
};


const signUp = async (req, username, password, done) => {

    try {
        const usuarioNuevo = await UserModel.create({ username, password});

        usuarioNuevo.password = await usuarioNuevo.encryptPassword(password);
        await usuarioNuevo.save();

        logger.info("SignUp OK");

        return done(null, usuarioNuevo);
    } catch (error) {
        logger.info(error);
        return done(null, false)
    }
}

const logIn = async (req, username, password, done) => {
    logger.info("LogIn OK");

    const usuario = await UserModel.findOne({ username });

    if (!usuario) {
        return done(null, false);
    } else {
        logger.info("usuario encontrado");
        const compare = await usuario.comparePassword(password);
        logger.info(compare);
        compare ? done(null, usuario) : done(null, false);
    }
}

export const logInFunc = new LocalStrategy(strategyOptions, logIn);
export const signUpFunc = new LocalStrategy(strategyOptions, signUp);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((userID, done) => {
    const usuario = UserModel.findById(userID);
    return done(null, usuario);
});
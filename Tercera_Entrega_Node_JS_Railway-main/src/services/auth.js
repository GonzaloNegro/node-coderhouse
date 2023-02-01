import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserModel } from "../models/user.model.js";
import { infoLogger, errorLogger } from "../logs/index.js";
import { sendUserSignUpMail } from "../mail/mail.js";

const strategyOptions = {
  usernameField: "username",
  passwordField: "password",
  passReqToCallback: true,
};

export let actualUser = {};

const signup = async (req, username, password, done) => {
  infoLogger.info("SIGNUP!");
  try {
    const query = { username: username };
    const user = await UserModel.findOne(query);

    if (user) {
      return done(null, false, { message: "El usuario ya existe!" });
    }

    let name = req.body.name;
    let adress = req.body.adress;
    let age = req.body.age;
    let phone = req.body.phone;
    let picture = req.body.picture;
    let admin = req.body.admin;

    const newUser = new UserModel({
      username,
      password,
      name,
      adress,
      age,
      phone,
      picture,
      admin,
    });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    await sendUserSignUpMail(
      username,
      password,
      name,
      adress,
      age,
      phone,
      picture,
      admin
    );
    return done(null, newUser);
  } catch (error) {
    errorLogger.error(error);
    return done(null, false, { message: "Error inesperado!" });
  }
};

const login = async (req, username, password, done) => {
  infoLogger.info("LOGIN!");
  try {
    const query = { username: username };
    const user = await UserModel.findOne(query);
    actualUser = user;
    if (!user) {
      return done(null, false, { message: "Usuario no encontrado!" });
    } else {
      const match = await user.matchPassword(password);
      if (match) {
        infoLogger.info("USUARIO ENCONTRADO!");
        return done(null, user);
      } else return done(null, false);
    }
  } catch (error) {
    errorLogger.error(error);
    return done(null, false, { message: "Error inesperado!" });
  }
};

export const loginFunc = new LocalStrategy(strategyOptions, login);
export const signUpFunc = new LocalStrategy(strategyOptions, signup);

passport.serializeUser((user, done) => {
  infoLogger.info("ejecuta serialize");
  done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
  infoLogger.info("ejecuta deserialize");
  const user = await UserModel.findById(userId);
  return done(null, user);
});

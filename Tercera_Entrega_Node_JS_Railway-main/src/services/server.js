import express from "express";
import mainRouter from "../routes/index.js";
import http from "http";
import session from "express-session";
import passport from "passport";
import { loginFunc, signUpFunc } from "../services/auth.js";
import MongoStore from "connect-mongo";
import Config from "../config/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ttlSeconds = 600;

const StoreOptions = {
  store: MongoStore.create({
    mongoUrl: Config.MONGO_ATLAS_URL,
  }),
  secret: "secretString",
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: ttlSeconds * 1000,
  },
};

app.use(session(StoreOptions));

app.use(passport.initialize());

app.use(passport.session());

passport.use("login", loginFunc);
passport.use("signup", signUpFunc);

app.use("/api", mainRouter);

app.use((req, res) => {
  return res.status(404).json({
    descripcion: `ruta ${req.url} no implementada!`,
  });
});

app.use(function (error, res) {
  return res.status("500").json({
    mensaje: "hubo un problema inesperado!",
    error: error.message,
  });
});

const httpServer = http.Server(app);

export default httpServer;

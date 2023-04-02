import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from "passport";
import cors from 'cors';
import Config from '../config/index.js';  
import mainRouter from'../routes/index.js';
import { logInFunc, signUpFunc } from '../services/passport.services.js';
import path from 'path';
import { fileURLToPath } from 'url';
import {info} from '../docs/info.js';
import  SwaggerUi  from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const viewsFolderPath = path.resolve(__dirname, '../../views');

const app = express();
const ttlSeconds = 600;

const specs = swaggerJSDoc(info);

const StoreOptions = {
  store: MongoStore.create({
    mongoUrl: Config.MONGO_ATLAS_URL,
      crypto:{
        secret:'hola',
      },
  }),
  secret: 'secretString', 
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: ttlSeconds * 1000,
  },
};

app.use(cors())
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session(StoreOptions));

app.use(passport.initialize());
app.use(passport.session());

app.set('views', viewsFolderPath);
app.set('view engine', 'pug');

passport.use('logIn', logInFunc);
passport.use('signUp', signUpFunc);

app.use('/api', mainRouter); 
app.use('/docs', SwaggerUi.serve, SwaggerUi.setup(specs));

export default app;
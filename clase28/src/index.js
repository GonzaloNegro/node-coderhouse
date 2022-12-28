import express from "express";
import infoRouter from "./routes/info.route.js";
import randomRouter from "./routes/random.route.js";
import Config from "./config/index.js";
import minimist from "minimist";

const optionalArgsObject = {
  alias: {
    p: "puerto",
  },
  default: {
    p: "8080",
  },
};

export const args = minimist(process.argv, optionalArgsObject);

const app = express();

app.use(express.json());

app.use("/api", infoRouter, randomRouter);

app.listen(Config.PORT, () =>
  console.log(`Escuchando en el puerto ${Config.PORT}`)
);

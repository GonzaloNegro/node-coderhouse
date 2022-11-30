import express from "express";
import mainRouter from "../routes/index.js";
import http from "http";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", mainRouter);

app.use((req, res) => {
  return res.status(404).json({
    error: -2,
    descripcion: `ruta ${req.url} no implementada`,
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

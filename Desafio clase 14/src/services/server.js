import express from "express";
import mainRouter from "../routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", mainRouter);

app.use((req, res, next) => {
  return res.status(404).json({
    error: -2,
    descripcion: `ruta ${req.url} no implementada`,
  });
});

export default app;
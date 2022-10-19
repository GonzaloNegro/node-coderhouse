const express = require("express");
const mainRouter = require("../routes/index");

/* INICIALIZACION API CON EXPRESS */
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use("/api", mainRouter);

/* EXPORTO MI APP */
module.exports = app;
const express = require("express");
const mainRouter = require("../routes/index");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

const viewsFolderPath = path.resolve(__dirname, "../../views");
app.set("views", viewsFolderPath);
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("ingresoProducto");
});

app.use("/api", mainRouter);

module.exports = app;
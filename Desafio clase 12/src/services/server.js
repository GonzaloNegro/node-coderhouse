const express = require("express");
const http = require("http");
const mainRouter = require("../routes/index");
const path = require("path");
const { productObj, productArray } = require("../classes/product");

const app = express();
const server = http.Server(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

const viewsFolderPath = path.resolve(__dirname, "../../views");
app.set("views", viewsFolderPath);
app.set("view engine", "pug");

app.get("/", (req, res) => {
  let quantity = productArray.length;
  let hasProducts = quantity == 0 ? false : true;
  res.render("AddProduct", { productArray, hasProducts });
});

app.use("/api", mainRouter);

module.exports = server;
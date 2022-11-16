import express from "express";
import http from "http";
import mainRouter from "../routes/index.js";
import { DBService } from "../classes/db.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const server = http.Server(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const viewsFolderPath = path.resolve(__dirname, "../../views");
app.set("views", viewsFolderPath);
app.set("view engine", "pug");

app.get("/", async (req, res) => {
  let productsTable = "products";
  let products = await DBService.getAll(productsTable);
  let productsQuantity = products.length;
  let hasProducts = productsQuantity == 0 ? false : true;
  res.render("AddProduct", { products, hasProducts });
});

app.use("/api", mainRouter);

export default server;
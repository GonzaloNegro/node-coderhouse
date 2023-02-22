import DaoFile from "./dao-filesystem/filesystem.js";
import DaoMemory from "./dao-memory/memory.js";
import DaoMongoDB from "./dao-mongodb/mongodb.js";
import { productsSchema } from "./dao-mongodb/schema/products.schema.js";

const selectedDAO = "mongo";
let dao = null;

switch (selectedDAO) {
  case "file":
    dao = new DaoFile("./src/persistence/daos/dao-filesystem/db.json");
    break;
  case "mongo":
    dao = new DaoMongoDB("productos", productsSchema);
    dao.initMongoDB();
    break;
  default:
    dao = new DaoMemory();
    break;
}

export async function save(obj) {
  return await dao.save(obj);
}

export async function getAll() {
  return await dao.getAll();
}

export async function updateProductById(
  id,
  title,
  description,
  code,
  photo,
  value,
  stock
) {
  return await dao.updateProductById(
    id,
    title,
    description,
    code,
    photo,
    value,
    stock
  );
}

export async function deleteProductById(id) {
  return await dao.deleteProductById(id);
}

export function getDao() {
  return dao;
}

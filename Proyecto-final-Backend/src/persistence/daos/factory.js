import DaoMongoDB from "./dao-mongodb/mongodb.js";
import { productsSchema } from "./dao-mongodb/schema/products.schema.js";

let dao = null;
let argv = 'mongo';
// let argv = process.argv[2];

switch (argv) {
    case 'file':
        dao = new DaoFile('./src/daos/filesystem/db.json');
        console.log(argv);
        break;
    case 'mongo':
        dao = new DaoMongoDB('products', productsSchema);
        dao.initMongoDB();
        break;
    default:
        dao = new DaoMemory();
        break;
};

export const save = async (obj) => {
    return await dao.save(obj);
};

export const getAll = async () => {
    return await dao.getAll();
};

export const getById = async (id) => {
    return await dao.getById(id)
};

export const updateProd = async (id, data) => {
    return await dao.updateProd(id, data)
};

export const deleteProd = async (id) => {
    return await dao.deleteProd(id)
};

export function getDao() {
    return dao;
};
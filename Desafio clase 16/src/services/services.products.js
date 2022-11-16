import { DBService } from "../classes/db.js";

const tableName = "products";

export const createProductService = async (data) => {
  try {
    const newId = await DBService.create(tableName, data);
    const newProduct = await DBService.getById(tableName, newId);
    return newProduct;
  } catch (error) {
    throw error;
  }
};
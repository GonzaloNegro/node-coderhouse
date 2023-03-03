import { buildSchema } from "graphql";
import {
  saveProductController,
  getAllProductsController,
  updateProductByIdController,
  deleteProductByIdController,
} from "../../controllers/graphql/products.controllers.js";

export const graphqlSchema = buildSchema(`
    input InputProduct{
        id: String!
        timestamp: String!
        title: String!
        description: String!
        code: String!,
        photo: String!,
        value: Float!
        stock: Int!
    }
    type Product{
        id: String!
        timestamp: String!
        title: String!
        description: String!
        code: String!,
        photo: String!,
        value: Float!
        stock: Int!
    }
    type Query{
        getAllProductsController:[Product]
    }
    type Mutation{
        saveProductController(data: InputProduct!):Product,
        updateProductByIdController(data:InputProduct!):Product,
        deleteProductByIdController(id:String!):Product,
    }
`);

export const graphqlRoot = {
  saveProductController,
  getAllProductsController,
  updateProductByIdController,
  deleteProductByIdController,
};

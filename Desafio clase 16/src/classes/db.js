import knex from "knex";
import { dbConfig } from "../options/knexfile.js";
import { Product } from "./product.js";

class DB {
  constructor() {
    const environment = process.env.NODE_ENV || "development";
    console.log(`SETTING ${environment} DB`);
    const options = dbConfig[environment];
    this.connection = knex(options);
  }

  async init() {
    this.connection.schema.hasTable("products").then((exists) => {
      if (exists) return;
      console.log("Creamos la tabla productos!");

      return this.connection.schema.createTable(
        "products",
        async (productsTable) => {
          productsTable.increments();
          productsTable.string("title", 100).notNullable();
          productsTable.decimal("value", 10, 2).notNullable();
          productsTable.string("thumbnail", 500).notNullable();
        }
      );
    });

    this.connection.schema.hasTable("messages").then((exists) => {
      if (exists) return;
      console.log("Creamos la tabla mensajes!");

      return this.connection.schema.createTable(
        "messages",
        async (messagesTable) => {
          messagesTable.increments();
          messagesTable.string("email", 100).notNullable();
          messagesTable.string("time", 50).notNullable();
          messagesTable.string("message", 1000).notNullable();
        }
      );
    });
  }

  async getAll(tableName) {
    try {
      return this.connection(tableName).select("*");
    } catch (error) {
      throw error;
    }
  }

  async getById(tableName, id) {
    try {
      if (id) return this.connection(tableName).where("id", id);
      else return -1;
    } catch (error) {
      throw error;
    }
  }

  async create(tableName, data) {
    try {
      return this.connection(tableName).insert(data);
    } catch (error) {
      throw error;
    }
  }
}

export const DBService = new DB();
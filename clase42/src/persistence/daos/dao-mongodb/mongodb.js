import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.set("strictQuery", false);

export default class DaoMongoDB {
  static instance;

  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
    if (!DaoMongoDB.instance) {
      this.initDB = mongoose.connect(process.env.MONGOURL, () =>
        console.log("Connected to MongoDB")
      );
      DaoMongoDB.instance = this;
      console.log("Se instancia la clase de mongo!");
    } else {
      console.log("La clase de mongo ya fue instanciada!");
      return DaoMongoDB.instance;
    }
  }

  async initMongoDB() {
    return this.initDB;
  }

  async save(doc) {
    try {
      const document = await this.collection.create(doc);
      return document;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const docs = await this.collection.find({});
      return docs;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProductById(id, title, description, code, photo, value, stock) {
    try {
      let product = await this.collection.findOne({ id: id });

      const docUpdated = await this.collection.findByIdAndUpdate(
        product._id,
        { title, description, code, photo, value, stock },
        { new: true }
      );
      return docUpdated;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProductById(id) {
    try {
      const doc = await this.collection.findOne({ id: id });
      await this.collection.findByIdAndDelete(doc._id);
      return doc;
    } catch (error) {
      console.log(error);
    }
  }
}

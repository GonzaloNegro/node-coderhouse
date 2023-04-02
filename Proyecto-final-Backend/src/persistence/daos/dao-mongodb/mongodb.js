import mongoose from 'mongoose';
import config from '../../../config/index.js';
import {logger} from '../../../helpers/log4js.js'

mongoose.set('strictQuery', false);

export default class DaoMongoDB {
    constructor(collection, schema) {
        this.collection = mongoose.model(collection, schema);
        this.initDB = mongoose.connect(config.MONGO_ATLAS_URL, () => logger.info("Conectado a mongoDB"));
    }

    async initMongoDB() {
        return this.initDB;
    }

    async save(doc) {
        try {
            const document = await this.collection.create(doc);
            return document;
        } catch (error) {
            logger.info(error);
        }
    }

    async getAll() {
        try {
            const docs = await this.collection.find({});
            return docs;
        } catch (error) {
            logger.info(error);
        }
    }

    async getById(id) {
        try {
            const response = await this.collection.findById(id);
            return response;
        } catch (error) {
            logger.info(error);
        }
    }

    async updateProd(id, data) {
        try {
            await this.collection.findByIdAndUpdate(id, data);

            const response = await this.collection.findById(id);

            return response;
        } catch (error) {
            logger.info(error);
        }
    }

    async deleteProd(id) {
        try {
            const response = await this.collection.findByIdAndDelete(id);
            return response;
        } catch (error) {
            logger.info(error);
        }
    }
};
import dotenv from "dotenv";

dotenv.config();

export default {
  MONGO_ATLAS_URL:
    process.env.MONGO_ATLAS_SRV || "mongodb://localhost:27017/ecommerce",
  PUERTO: process.env.PUERTO || 8080,
};

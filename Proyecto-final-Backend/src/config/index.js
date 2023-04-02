import dotenv from 'dotenv';

dotenv.config();

export default {
    MONGO_ATLAS_URL: process.env.MONGO_ATLAS_SRV || 'mongodb://localhost/coderhouse',
    PUERTO:process.env.PUERTO,
    ADM_EMAIL:process.env.ADM_EMAIL,
    SRV_EMAIL:process.env.SRV_EMAIL,
    PASSWORD:process.env.PASSWORD,
    PORT_GMAIL:process.env.PORT_GMAIL,
}
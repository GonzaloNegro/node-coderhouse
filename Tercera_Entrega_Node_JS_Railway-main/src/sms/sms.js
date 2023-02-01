import twilio from "twilio";
import dotenv from "dotenv";
import { infoLogger, warnLogger, errorLogger } from "../logs/index.js";
dotenv.config();

const twilioClient = twilio(process.env.SID, process.env.TOKEN);

export const sendSms = async (phone) => {
  try {
    console.log(phone);
    const message = {
      body: "Pedido recibido!",
      from: process.env.SMS,
      to: "+" + phone,
    };
    const response = await twilioClient.messages.create(message);
    infoLogger.info(response);
    warnLogger.warn(response);
  } catch (error) {
    errorLogger.warn(error);
  }
};

export const sendWS = async (usuario) => {
  try {
    const message = {
      body: `Se ingreso un pedido del usuario ${usuario.username} - ${usuario.name}. Gracias por su compra!`,
      from: process.env.CEL,
      to: "whatsapp:+" + usuario.phone,
    };
    const response = await twilioClient.messages.create(message);
    infoLogger.info(response);
    warnLogger.warn(response);
  } catch (error) {
    errorLogger.warn(error);
  }
};

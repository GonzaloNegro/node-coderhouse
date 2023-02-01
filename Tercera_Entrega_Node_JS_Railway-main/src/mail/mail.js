import { createTransport } from "nodemailer";
import { infoLogger, warnLogger, errorLogger } from "../logs/index.js";
import dotenv from "dotenv";
dotenv.config();

const transporter = createTransport({
  host: process.env.HOST,
  port: process.env.PORT_ETHEREAL,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const signUpMailOptions = {
  from: process.env.EMAIL,
  to: process.env.EMAIL,
  subject: "Nuevo registro",
  text: "",
};

const finishedOrderMailOptions = {
  from: process.env.EMAIL,
  to: process.env.EMAIL,
  subject: "",
  text: "",
};

export const sendUserSignUpMail = async (
  username,
  password,
  name,
  adress,
  age,
  phone,
  picture,
  admin
) => {
  try {
    let response;
    signUpMailOptions.text = `Username: ${username} - password: ${password} - name: ${name} - adress: ${adress} - age: ${age} - phone: ${phone} - picture: ${picture} - admin: ${admin}`;
    response = await transporter.sendMail(signUpMailOptions);
    infoLogger.info(response);
    warnLogger.warn("Email enviado!");
    warnLogger.warn(response);
  } catch (error) {
    errorLogger.error(error);
  }
};

export const sendUserFinishBuyMail = async (username, name, productsInCart) => {
  try {
    let response;
    finishedOrderMailOptions.subject = `Nuevo pedido de ${name} - ${username}`;
    finishedOrderMailOptions.text = `Productos: ${productsInCart}`;
    response = await transporter.sendMail(finishedOrderMailOptions);
    infoLogger.info(response);
    warnLogger.warn("Email enviado!");
    warnLogger.warn(response);
  } catch (error) {
    errorLogger.error(error);
  }
};

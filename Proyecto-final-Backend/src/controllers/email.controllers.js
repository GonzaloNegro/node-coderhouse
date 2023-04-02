import { transporter } from "../services/email.services.js";
import Config from '../config/index.js';
import {logger} from '../helpers/log4js.js'

export const newUserGmail = async (email) => {

    const mailOptions = {
        from: Config.ADM_EMAIL,
        to: Config.SRV_EMAIL,
        subject: '¡Nuevo registro!',
        html: `<h1>Se registro un nuevo usuario con email: ${email}</h1>`
    };

    try {
        await transporter.sendMail(mailOptions);
        logger.info("Email enviado");
    } catch (error) {
        logger.info(error);
    }
};

export const buyCartGmail = async (body, email) => {

    const mailOptions = {
        from: Config.ADM_EMAIL,
        to: Config.SRV_EMAIL,
        subject: `Nueva orden de ${email} `,
        text: `
        Email: ${email}
        Orden: ${body}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        logger.info("Gmail enviado");
    } catch (error) {
        logger.info(error);
    }
};
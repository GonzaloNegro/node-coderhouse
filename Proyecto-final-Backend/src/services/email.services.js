import { createTransport } from 'nodemailer';
import Config from '../config/index.js';  

export const transporter = createTransport({

    service: 'gmail',
    port:Config.PORT_GMAIL,
    auth: {
        user:Config.ADM_EMAIL,
        pass:Config.PASSWORD,
    }

});
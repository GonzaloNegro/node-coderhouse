import server from './services/chat.services.js'
import config from './config/index.js';
import { logger } from './helpers/log4js.js';

const PORT = config.PUERTO;

server.listen(PORT, () => {

    logger.info(`Server ok, puerto: ${PORT}`);
});

export default server;
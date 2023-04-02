import ChatModel from '../persistence/daos/dao-mongodb/schema/Chat.schema.js'
import {logger} from '../helpers/log4js.js'

export const saveMsg = async (data) => {

    try {

        const nuevoMsj = {
            user: data.email || 'Usuario anonimo',
            text: data.msg
        }
        await ChatModel.create(nuevoMsj)

    } catch (error) {
        logger.info("Error al guardar mensaje", error);
    }
};

export const renderChat = async (req, res) => {

    try {
        res.render('chat');

    } catch (error) {
        logger.info("Error al mostrar chat", error);
    }
};
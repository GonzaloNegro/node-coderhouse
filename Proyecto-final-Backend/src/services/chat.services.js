import app from './server.js';
import http from 'http';
import { Server } from "socket.io";
import moment from 'moment';
import { saveMsg } from '../controllers/chat.controller.js';

const myHTTPServer = http.createServer(app);
const io = new Server(myHTTPServer);


const formatMensaje = (username, text) => {
    return {
        username,
        text,
        time: moment().format('h:mm a')
    };
}

// CONNECTION

io.on('connection', async (socket) => {

    // BIENVENIDA AL CHAT

    socket.emit('mensaje', formatMensaje('Chat Bot', `!Bienvenido al chat!`));

    // AVISO A OTROS USUARIOS - NUEVO USUARIO EN EL CHAT

    socket.broadcast.emit('mensaje', formatMensaje('Chat Bot', `Se unio un nuevo usuario al chat`));

    // MENSAJES ENTRE TODO EL CHAT

    socket.on('chatMensaje', async (userMsj) => {

        const newMensaje = formatMensaje(userMsj.email || 'Usuario anonimo', userMsj.msg);
        await saveMsg(userMsj)

        io.emit('mensaje', newMensaje);

    });

    // AVISO DE DESCONECCION

    socket.on('disconnect', () => {
        socket.broadcast.emit('mensaje', formatMensaje('Chat Bot', 'Un usuario abandono el chat'));
    });
});


export default myHTTPServer;
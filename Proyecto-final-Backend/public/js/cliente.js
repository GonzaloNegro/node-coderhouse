const socket = io();

const chat = document.getElementById('chat-form');
const mensajesChat = document.querySelector('.chat-messages');
const emailInput = document.getElementById('email')

const mostrarMensaje = (mensaje) => {

    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML =
        `<p class="meta">${mensaje.username} <span> ${mensaje.time}</span></p>
     <p class="text">
        ${mensaje.text}
     </p>`;

    document.querySelector('.chat-messages').appendChild(div);
};

socket.on('mensaje', mensaje => {

    mostrarMensaje(mensaje);

    mensajesChat.scrollTop = mensajesChat.scrollHeight;
});

chat.addEventListener('submit', (ev) => {

    ev.preventDefault();

    const msg = ev.target.elements.msg.value;
    const email = emailInput.value;

    console.log(email)

    socket.emit('chatMensaje', { msg, email });

    ev.target.elements.msg.value = '';

})

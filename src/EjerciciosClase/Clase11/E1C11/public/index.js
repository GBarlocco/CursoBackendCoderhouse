const socket = io();

const input = document.querySelector(`input#message`);
const button = document.querySelector(`button#send`);

button.addEventListener(`click`, () => {
    socket.emit(`mensajeCliente`, input.value);
});

socket.on(`mensajeServidor`, data => {
    const message = `<br> ScoketId: ${data.socketId}, Mensaje: ${data.mensaje}`;
    document.querySelector(`p`).innerHTML += message;
})

socket.on(`allMensajes`, data => {
    const messages = data.map(message => `ScoketId: ${message.socketId}, Mensaje: ${message.mensaje}`).join(`<br>`);

    document.querySelector(`p`).innerHTML = messages;
})

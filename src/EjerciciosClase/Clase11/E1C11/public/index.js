const socket = io();

const input = document.querySelector(`input#message`);

input.addEventListener(`input`, () => {
    socket.emit(`mensajeCliente`, input.value);
});

socket.on(`mensajeServidor`, data => {
    document.querySelector(`p`).innerHTML = data;
})

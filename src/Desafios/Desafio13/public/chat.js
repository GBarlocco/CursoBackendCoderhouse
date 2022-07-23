const socket = io();

const spanServerMessage = document.getElementById(`serverNotification`);
const usersList = document.getElementById(`usersList`);
const sendMessage = document.getElementById(`sendMessage`);
const messageInput = document.getElementById(`messageInput`);
const messagesContainer = document.getElementById('messagesContainer');

// Obtenemos el nombre de usario de los query params: ?aliasName=nombreIngresado
const { aliasName } = Qs.parse(window.location.search, {
    ignoreQueryPrefix: true
});

//Cliente --> Servidor: el cliente le envía al servidor el nombre del usuario.
socket.emit(`joinChat`, { aliasName });

//Servidor --> Cliente: El servidor envía notificación.
socket.on(`notification`, data => {
    spanServerMessage.innerHTML = data;
});

//Servidor --> Cliente: El servidor envía todos los mensajes al usuario que se conecta.
socket.on(`allMenssage`, data => {
    console.log(`Estoy desde el sevidor: mensajes recibidos:`);
    console.log(data);

    const message = "";
    data.forEach(message => {
        message = `
            <li class="clearfix">
            <div class="message-data text-right">
                    <span class="message-data-time">${message.author.id}:</span>
                </div>
                <div class="message other-message float-right"> ${message.text.mensaje} </div>
            </li>
        `;
        messagesContainer.innerHTML += message;
    })
});

//Servidor --> Cliente: El servidor envía la lista actualizada de usuarios
socket.on(`users`, data => {

    const users = data
        .map(user => {
            const userTemplate = `
                <li class="clearfix">
                    <img src=${user.avatar} alt="avatar">
                    <div class="about">
                        <div class="name"> ${user.aliasName}</div>
                        <div class="status"> <i class="fa fa-circle online"></i> Online </div>
                    </div>
                </li>
            `;
            return userTemplate;
        })
        .join(``);

    usersList.innerHTML = users;
});

//Cliente --> Servidor: ejecuto un evento que envia el mensaje escrito por el usuario.
sendMessage.addEventListener('click', () => {
    socket.emit('messageInput', messageInput.value);
    messageInput.value = "";
});


//Servidor -->cliente:
socket.on(`message`, data => {
    const message = `
        <li class="clearfix">
        <div class="message-data text-right">
                <span class="message-data-time">${data.author.id}:</span>
            </div>
            <div class="message other-message float-right"> ${data.text.mensaje} </div>
        </li>
    `
    messagesContainer.innerHTML += message;
});
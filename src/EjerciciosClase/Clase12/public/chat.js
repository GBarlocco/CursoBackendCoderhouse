console.log("Estoy en chat.js 1");
const socket = io();

const spanServerMessage = document.getElementById(`serverNotification`);
const usersList = document.getElementById(`usersList`);
const sendMessage = document.getElementById(`sendMessage`);
const menssageInput = document.getElementById(`menssageInput`);
const messagesContainer = document.getElementById('messagesContainer');

// Obtenemos el nombre de usario de los query params: ?userName=nombreIngresado
const { userName } = Qs.parse(window.location.search, {
    ignoreQueryPrefix: true
});

//Cliente --> Servidor: el cliente le envía al servidor el nombre del usuario.
socket.emit(`joinChat`, { userName });

//Servidor --> Cliente: El servidor envía notificación.
socket.on(`notification`, data => {
    spanServerMessage.innerHTML = data;
});

//Servidor --> Cliente: El servidor envía la lista actualizada de usuarios
socket.on(`users`, data => {

    const users = data
        .map(user => {
            const userTemplate = `
                <li class="clearfix">
                    <img src=${user.avatar} alt="avatar">
                    <div class="about">
                        <div class="name"> ${user.userName}</div>
                        <div class="status"> <i class="fa fa-circle offline"></i> left 7 mins ago </div>
                    </div>
                </li>
            `
            return userTemplate;
        })
        .join(``);

    usersList.innerHTML = users;
});

//Cliente --> Servidor: ejecuto un evento que envia el mensaje escrito por el usuario.
sendMessage.addEventListener('click', () => {
    socket.emit('messageInput', messageInput.value);
});


//Servidor -->cliente:
socket.on(`message`, data => {
    const message = `
        <li class="clearfix">
            <div class="message-data">
                <span class="message-data-time"> ${data.time}, ${data.user.userName}:</span>
            </div>
            <div class="message my-message"> ${data.text}</div>
        </li>
    `
    messagesContainer.innerHTML += message;
});

//Servidor -->cliente:
socket.on(`myMessage`, data => {
    const message = `
        <li class="clearfix">
            <div class="message-data text-right">
                <span class="message-data-time">${data.time} </span>
                <img src=${data.user.avatar} alt="avatar">
            </div>
            <div class="message other-message float-right"> ${data.text} </div>
        </li>
    `
    messagesContainer.innerHTML += message;
});
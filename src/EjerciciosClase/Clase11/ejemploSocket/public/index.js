const socket = io();

socket.on(`Mi mensaje`, (data) => {
    alert(data);
    socket.emit(`notificacion`, `Responde el cliente: mensaje recibido exitosamente`);
});

socket.on(`Nuevo usuario`, data =>{
    alert (data);
});
class MessageDTO {
    constructor(message) {
        this.id = message.author.id
        this.nombre = message.author.nombre
        this.apellido = message.author.apellido
        this.edad = message.author.edad
        this.alias = message.author.alias
        this.avatar = message.author.avatar
        this.mensaje = message.text.mensaje
    }
};

module.exports = MessageDTO;
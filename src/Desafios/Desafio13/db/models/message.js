const { Schema, model } = require(`mongoose`);

const messageSchema = new Schema({
    id: { type: String, required: true },
    author: { type: Object, required: true },
    text: { type: Object, required: true }
}, {
    versionKey: false 
});

module.exports = model(`Messages`, messageSchema);

/*

const { Schema, model } = require(`mongoose`);

const messageSchema = new Schema({
    id: { type: String, required: true },
    author: { type: Object, required: true },
    text: { type: Object, required: true },

});

module.exports = model(`Messages`, messageSchema);




            {
                "id": "barlocco@hotmail.es", //
                "author": {
                    "id": "barlocco@hotmail.es",
                    "nombre": "Nombre del usuario",
                    "apellido": "apellido del usuario",
                    "alias": "alias del usuario",
                    "avatar": "avatar del usuario"
                },
                "text": {
                    "id": 1,
                    "mensaje": "mensaje"
                }
            },
            */
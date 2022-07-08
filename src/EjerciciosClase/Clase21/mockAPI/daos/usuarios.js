const ContenedorMemoria = require(`../contenedores/ContenedorMemoria`);
const { generateUser } = require(`../utils/generateUser`);

class DAOUsuariosMock extends ContenedorMemoria {
    constructor() {
        super();
    }

    populate(total = 50) {
        for (let i = 0; i < total; i++) {
            const newUser = generateUser();
            this.create(newUser);
        }

        return this.findAll();
    }
}

module.exports = DAOUsuariosMock;
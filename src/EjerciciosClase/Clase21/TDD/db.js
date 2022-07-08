//DB en MongoDB:
class DB {
    constructor(options) {
        this.model = options.model;
    }

    get() {
        return this.model.find();
    }
}


//Simulación para obtener de una DB los usuarios con una edad >= a la enviada por parámetro.
const usuariosFiltrados = (db, maxAge) => {

    const users = db.get();

    const filteredUsers = users.filter(user => user.age >= maxAge);

    return filteredUsers;
}

export {
    usuariosFiltrados
};
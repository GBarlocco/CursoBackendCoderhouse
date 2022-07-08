class ContenedorMemoria {
    constructor() {
        this.data = [];
    }

    findAll() {
        return this.data;
    }

    find(id) {
        const index = this.data.findIndex(item => item.id == id);

        if (index === -1) {
            throw new Error(`Error al listar: elemento no encontrado`);
        }

        return this.data[index];
    }

    create(data) {
        this.data.push(data);
    }

    update(id, data) {
        const index = this.data.findIndex(item => item.id == id);

        if (index === -1) {
            throw new Error(`Error al actualizar: elemento no encontrado`);
        }

        this.data[index] = Object.assign(this.data[index], data);

        return this.data[index];
    }

    delete(id) {
        const index = this.data.findIndex(item => item.id == id);

        if (index === -1) {
            throw new Error(`Error al borrar: elemento no encontrado`);
        }

        this.data.splice(index, 1);

        return true;
    }
}

module.exports = ContenedorMemoria;
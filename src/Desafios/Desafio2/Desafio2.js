const fs = require('fs');

class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
    }

    async read() {
        try {
            let data = await fs.promises.readFile(`./${this.archivo}`, `utf-8`);
            return data;

        } catch (err) {
            throw Error(`Error al leer el archivo ${err}`);
        }
    }

    async write(datos, msg) {
        try {
            await fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(datos, null, 2));
            console.log(msg);
        } catch (err) {
            throw Error(`Error al escribir en el archivo ${err}`);
        }
    }

    async save(product) {
        let newId = 1;
        let newProduct = {};

        let data = await this.read();
        let datos = JSON.parse(data);

        if (!data) {
            product.id = newId;
            newProduct = [product];
        } else {
            product.id = datos[datos.length - 1].id + 1;
            newProduct = product;
        }
        datos.push(newProduct);

        await this.write(datos, `Agregado!`);
    }

    async getById(myId) {
        let data = await this.read();
        let datos = JSON.parse(data);

        let result = datos.filter(product => product.id == myId);
        return result;
    }

    async getAll() {
        let data = await this.read();
        let datos = JSON.parse(data);

        return datos;
    }

    async deleteById(myId) {
        let data = await this.read();
        let datos = JSON.parse(data);

        let product = datos.find(product => product.id == myId);
        if (product) {
            let index = datos.indexOf(product);
            console.log(index);
            datos.splice(index, 1);
            await this.write(datos, `Producto con ID: ${myId} eliminado`);
        } else {
            console.log(`Producto con ID: ${myId} no existe`);
        }
    }

    async deleteAll() {
        let data = [];
        await this.write(data, `Se eliminaron todos los productos`);
    }
}
module.exports = Contenedor;

/*
let contenedor = new Contenedor(`/productos.txt`);

async function test() {
    const newProduct = {
        title: `Producto`,
        price: 11111,
        thumbnail: `link`
    };
    await contenedor.save(newProduct);

    console.table(await contenedor.getById(2));

    console.table(await contenedor.getAll());

    await contenedor.deleteById(7);
}
test();
*/
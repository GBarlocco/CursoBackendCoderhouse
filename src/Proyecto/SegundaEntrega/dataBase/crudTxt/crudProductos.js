class Contenedor {
    constructor(archivo, fs) {
        this.archivo = archivo;
        this.fs = fs;
    }

    async read() {
        try {
            console.log(this.archivo);
            let data = await this.fs.promises.readFile(`./${this.archivo}`, `utf-8`);
            return data;

        } catch (err) {
            throw Error(`Error al leer el archivo ${err}`);
        }
    }

    async write(datos, msg) {
        try {
            await this.fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(datos, null, 2));
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

        return product.id;
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

    async deleteById(idProduct) {
        let data = await this.read();
        let datos = JSON.parse(data);

        let product = datos.find(product => product.id == idProduct);
        console.log(product);
        if (product) {
            let index = datos.indexOf(product);
            console.log(index);
            datos.splice(index, 1);
            await this.write(datos, `Producto con ID: ${idProduct} eliminado`)
        } else {
            throw Error(`Producto con ID: ${idProduct} no existe`);
        }
    }

    async deleteAll() {
        let data = [];
        await this.write(data, `Se eliminaron todos los productos`);
    }
}
module.exports = Contenedor;
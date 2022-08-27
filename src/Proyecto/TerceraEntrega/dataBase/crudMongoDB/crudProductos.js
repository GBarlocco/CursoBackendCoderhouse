class Contenedor {
    constructor(mongoDB, productsModel) {
        this.mongoDB = mongoDB;
        this.productsModel = productsModel;
    }

    async save(product) {
        // Instancia del modelo Producto
        product = new this.productsModel(product);

        this.mongoDB
            .then(_ => product.save())
            .then(document => document)
            .catch(err => console.log(`Error: ${err.message}`));
    }

    async getAll() {
        try {
            let docs = false;
            docs = await this.productsModel.find();
            if (docs) {
                return docs;
            } else {
                return false;
            }
        } catch (error) {
            throw Error(`Error en getAll`);
        }
    }

    async getById(idProduct) {
        try {
            let doc = false;
            doc = await this.productsModel.findOne({ _id: idProduct }, { __v: 0 });

            if (doc) {
                return doc;
            } else {
                return false;
            }
        } catch (error) {
            throw Error(`Error Producto no encontrado`);
        }
    }

    async deleteById(idProduct) {
        this.mongoDB
            .then(_ => this.productsModel.deleteOne({
                _id: idProduct
            }))
            .catch(err => console.log(`Error: ${err.message}`))
    }


    async updateById(idProduct, name, price, url, description, date, code, stock) {

        this.mongoDB
            .then(_ => this.productsModel.findOne({ _id: idProduct }, { __v: 0 }))
            .then(product => {
                product.nombre = name;
                product.precio = price;
                product.url = url;
                product.descripcion = description;
                product.date = date;
                product.codigo = code;
                product.stock = stock;

                return product.save();
            })
            .catch(err => console.log(`Error: ${err.message}`))
    }

}
module.exports = Contenedor;
class Contenedor {
    constructor(mongoDB, cartModel, productsModel, userModel) {
        this.mongoDB = mongoDB;
        this.cartModel = cartModel;
        this.productsModel = productsModel;
        this.userModel = userModel
    }

    async createCart() {
        let date = new Date();
        let newCart = {
            timestamp: date,
            products: [],
        };
        const cart = new this.cartModel(newCart);

        this.mongoDB
            .then(_ => cart.save())
            .then(document => console.log(document))
            .catch(err => console.log(`Error: ${err.message}`));
    }

    async getProductsByID(idCart) {
        let docs = false
        docs = await this.cartModel.findOne({ _id: idCart }, { __v: 0 });
        if (docs) {
            return docs.products;
        } else {
            return false;
        }
    }

    async deleteCartById(idCart) {
        this.mongoDB
            .then(_ => this.cartModel.deleteOne({
                _id: idCart
            }))
            .then(result => console.log(result))
            .catch(err => console.log(`Error: ${err.message}`))
    }

    async addProduct(idUser, idProduct) {
        let docUser = false;
        let docProduct = false;

        docUser = await this.userModel.findOne({ _id: idUser }, { __v: 0 });
        docProduct = await this.productsModel.findOne({ _id: idProduct }, { __v: 0 });
        /*
        if (docUser.carrito[i]._id.toString() == docProduct._id.toString()) {
        }
        */
        if (docUser && docProduct) {
            docUser.carrito.push(docProduct);
            return docUser.save();
        } else {
            throw Error(`Error al acceder al id del carrito / producto`);
        }
    }


    async deleteProductById(idCart, idProduct) {
        let docCart = false;
        let docProduct = false

        docCart = await this.cartModel.findOne({ _id: idCart }, { __v: 0 });
        docProduct = await this.productsModel.findOne({ _id: idProduct }, { __v: 0 });

        if (docCart && docProduct) {
            let allProductsFromCart = docCart.products;
            let products = [];

            for (let i = 0; i <= allProductsFromCart.length - 1; i++) {
                if (allProductsFromCart[i]._id.toString() != docProduct._id.toString()) {
                    products.push(allProductsFromCart[i]);
                }
            }
            docCart.products = products;
            return docCart.save();
        } else {
            throw Error(`Error al acceder al id del carrito / producto`);
        }
    }    
/*
    async updateById(idUsuario, idProducto cantidad) {

        this.mongoDB
            .then(_ => this.userModel.findOne({ _id: idUsuario }, { __v: 0 }))
            .then(usuario => {



                product.cantidad = cantidad;

                return product.save();
            })
            .catch(err => console.log(`Error: ${err.message}`))
    }
*/


    /*
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

    */
}
module.exports = Contenedor;

const ProductsDTO = require("../../DTOs/ProductsDTO");
class Contenedor {
    constructor(mongoDB, productsModel) {
        this.mongoDB = mongoDB();
        this.productsModel = productsModel;
    }

    async save(product) {
        try {
            // Instancia del modelo message
            const newProduct = new this.messageModel(product);

            this.mongoDB
                .then(_ => newProduct.save())
                .catch(err => console.log(`Error: ${err.message}`));

        } catch (error) {
            throw Error(`Error en save`);
        }
    }

    async getAll() {
        try {
            /*
            Esta lógica va en Repository:
        
            const products = await this.productsModel.find();
            const productDTO = products.map(product => new ProductsDTO(product));
            */
            const products = await this.productsModel.find();
            const productDTO = products.map(product => new ProductsDTO(product));
            if (productDTO) {
                return productDTO;
            } else {
                return false;
            }
        } catch (error) {
            throw Error(`Error en getAll`);
        }
    }


    /*
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

    async addProduct(idCart, idProduct) {
        let docCart = false;
        let docProduct = false

        docCart = await this.cartModel.findOne({ _id: idCart }, { __v: 0 });
        docProduct = await this.productsModel.findOne({ _id: idProduct }, { __v: 0 });

        if (docCart && docProduct) {

            docCart.products.push(docProduct);
            return docCart.save();
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
    */
}
module.exports = Contenedor;

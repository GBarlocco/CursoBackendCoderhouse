class Contenedor {
    constructor(mongoDB, productsModel, userModel, ordenModel) {
        this.mongoDB = mongoDB;
        this.productsModel = productsModel;
        this.userModel = userModel,
            this.ordenModel = ordenModel
    }

    async createOrden(idOwner) {
        let docUser = false;
        let productsOrden = [];
        docUser = await this.userModel.findOne({ _id: idOwner }, { __v: 0 });

        if (docUser) {
            productsOrden = docUser.carrito;
            docUser.carrito = [];

            let date = new Date();
            let newOrden = {
                timestamp: date,
                products: productsOrden,
                idOwner: idOwner
            };
            await docUser.save();

            const orden = new this.ordenModel(newOrden);

            this.mongoDB
                .then(_ => orden.save())
                .then(document => console.log(document))
                .catch(err => console.log(`Error: ${err.message}`));

            return orden;
        } else {
            throw Error(`Error al acceder al usuario`);
        }

    }

}
module.exports = Contenedor;

class Contenedor {
    constructor(queryProductos) {
        this.queryProductos = queryProductos;
    }

    async save(product) {
        await this.queryProductos.add(product);
    }

    async getAll() {
        const docsProducts = await this.queryProductos.get();

        const allProducts = docsProducts.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        });
        return allProducts;
    }

    async getById(idProduct) {
        const docsProducts = this.queryProductos.doc(idProduct);
        const response = await docsProducts.get();

        const product = {
            id: response.id,
            ...response.data()
        };
        return product;
    }

    async updateById(idProduct, name, price, url, description, date, code, stock) {
        const docsProducts = this.queryProductos.doc(idProduct);

        await docsProducts.update({
            nombre: name,
            precio: price,
            thumbnail: url,
            descripcion: description,
            timestamp: date,
            codigo: code,
            stock: stock
        });

    }
    
    async deleteById(idProduct) {
        console.log(idProduct);
        const docsProducts = this.queryProductos.doc(idProduct);

        await docsProducts.delete();
    }
}
module.exports = Contenedor;
const { mySQLContenedor } = require(`./Contenedor`);

insertProduct = async (product) => {
    try {
        // INSERT INTO products(title, price, thumbnail) VALUES ("nombre", 20, "url");  F
        let inserProduct = await mySQLContenedor.getKnex()
            .into(`products`)
            .insert(product);

        //Devuelvo el útimo producto ingresado
        const allProducts = await mySQLContenedor.knex()
            .select(`*`)
            .from(`products`);
        return allProducts[allProducts.length - 1];

    } catch (err) {
        console.log(`Error ${err}`);
    }
};


module.exports = {
    insertProduct
}
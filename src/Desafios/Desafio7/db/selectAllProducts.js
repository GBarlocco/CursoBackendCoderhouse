const { mySQLContenedor } = require(`./Contenedor`);

selectAllProducts = async () => {
    try {
        // SELECT * FROM products
        const allProducts = await mySQLContenedor.getKnex()
            .select(`*`)
            .from(`products`);

        return allProducts;
    } catch (err) {
        console.log(`Error ${err}`);
    }
};

module.exports = {
    selectAllProducts
}
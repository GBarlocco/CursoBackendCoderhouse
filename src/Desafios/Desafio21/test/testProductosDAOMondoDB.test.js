const ProductosDAOMongoDB = require(`../daos/productos/ProductosDAOMongoDB`);
const assert = require(`assert`);

//Test TDD:

/*
describe(`Test sobre DAO Productos MondoDB`, () => {

    //Se parte del valor conocido que la DB tiene productos cargados:
    it(`Debería obtener todos los productos`, async () => {
        const productoDAO = new ProductosDAOMongoDB();
        const allProducts = await productoDAO.getAll();

        assert(allProducts.length > 0);
    });

    it(`Debería crear un producto`, async () => {
        const productoDAO = new ProductosDAOMongoDB();

        const allProductsBefore = await productoDAO.getAll();

        const newProducto = {
            nombre: `producto desde test mocha `,
            precio: 1234,
            url: `URL desde test mocha`,
            descripcion: `descripción desde test mocha`,
            timestamp: new Date().toDateString(),
            thumbnail: `URL desde test mocha`,
            codigo: 33333,
            stock: 3,
            cantidad: 0
        }

        await productoDAO.save(newProducto);

        const allProductsAfter = await productoDAO.getAll();

        assert(allProductsAfter.length > allProductsBefore.length);
    });

    it(`Debería modificar un producto`, async () => {
        const productoDAO = new ProductosDAOMongoDB();

        //Colocar un id conocido de la DB
        const id = `632f543276a488c300921477`;

        const productBefore = await productoDAO.getById(id);
        console.log(`productBefore`);
        console.log(productBefore);

        const productUpdate = await productoDAO.updateById(
            id,
            `modificado desde Test1`,
            9,
            `URL modificada desde test`,
            `Descripción modificada desde test`,
            new Date().toDateString(),
            9999,
            1
        );
        console.log(`productUpdate`);
        console.log(productUpdate);

        assert(productBefore.nombre != productUpdate.nombre);

    });

    //Para ejecutar esta función, es mejor comentar el de agregar producto
    it(`Debería borrar un producto`, async () => {
        const productoDAO = new ProductosDAOMongoDB();

        const allProductsBefore = await productoDAO.getAll();

        //Colocar un id conocido de la DB
        await productoDAO.deleteById(`632efb17324f2ba3f6932581`);

        const allProductsAfter = await productoDAO.getAll();

        assert(allProductsBefore.length > allProductsAfter.length);
    });

});


*/
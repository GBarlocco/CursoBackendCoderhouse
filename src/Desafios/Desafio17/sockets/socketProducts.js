//CRUD DB
const { selectAllProducts } = require(`../db/selectAllProducts`);
const { insertProduct } = require(`../db/insertProduct`);

const socketIoProducts = (io) => {
    //socket Products
    io.on(`connection`, socket => {
        socket.on(`sendProduct`, async () => {
            const allProductsFromDB = await selectAllProducts();

            //Servidor --> Cliente : Se envian todos los mensajes al usuario que se conectó.
            socket.emit(`allProducts`, allProductsFromDB);

        });

        socket.on(`addProducts`, async data => {
            const newProducto = {
                title: `${data.name}`,
                price: Number(data.price),
                thumbnail: `${data.img}`
            };

            const product = await insertProduct(newProducto);

            //Envio el producto nuevo a todos los clientes conectados
            io.sockets.emit(`refreshTable`, [product]);

        });
    });

}

module.exports = socketIoProducts;
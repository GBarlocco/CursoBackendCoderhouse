const axios = require(`axios`);

const addProduct = async () => {
    const addProduct = await axios.post(`http://localhost:8080/test/productos`, {
        nombre: `producto desde Axios`,
        precio: 1234,
        url: `URL desde Axios`,
        descripcion: `descripción desde Axios`,
        timestamp: new Date().toDateString(),
        codigo: 33333,
        stock: 3,
        cantidad: 0
    });

    console.log({
        status: addProduct.status,
        data: addProduct.data
    });

}

addProduct();

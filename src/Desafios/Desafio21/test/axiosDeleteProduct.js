const axios = require(`axios`);

const deleteProduct = async () => {
    const deleteProduct = await axios.delete(`http://localhost:8080/test/productos/632f543276a488c300921477`);
    console.log({
        status: deleteProduct.status,
        data: deleteProduct.data
    });
}

deleteProduct();
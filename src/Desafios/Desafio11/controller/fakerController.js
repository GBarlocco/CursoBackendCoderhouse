const faker = require(`faker`);

const getFaker = (req, res) => {
    const dataRandom = [];
    const data = {
        dataRandom: dataRandom
    };

    for (let i = 0; i < 5; i++) {
        dataRandom.push({
            nombre: faker.commerce.productName(),
            precio: faker.commerce.price(),
            foto: faker.image.image()
        });
    }
    res.render('faker', data);
}
module.exports = {
    getFaker
};





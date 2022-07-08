const faker = require(`faker`);

faker.locale = `es`;

const generateUser = () => {
    return {
        id: faker.datatype.uuid(),
        nombre: faker.name.firstName(),
        email: faker.internet.email(),
        website: faker.internet.url(),
        image: faker.image.avatar()
    }
}


module.exports = { generateUser };
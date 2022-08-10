module.exports = (data) => {
    return new Promise((resolve, reject) => {
        getInfo(data, (err, results) => {
            if (err) {
                return reject(err);
            }
        });
        return resolve(results);
    });
};
const products = [];

const addProduct = (product) => {
    products.push(product);
    return Promise.resolve(true);
};
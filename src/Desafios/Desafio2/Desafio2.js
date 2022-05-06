const fs = require(`fs`);

class Contenedor {
    constructor(archivo) {
        this.archivo = `./${archivo}`;
        this.allProduct = [];
    }
    static id = 0;

    save(product) {
        this.upId();
        product.id = Contenedor.id;

        fs.promises.readFile(`${this.archivo}`, `utf-8`)
            .then(() => {
                this.allProduct.push(product);
                return fs.promises.writeFile(`${this.archivo}`, JSON.stringify(this.allProduct));
            })
            .catch(err => {
                console.error(err);
            })
    }

    getById(id) {
        let product = null;
        fs.promises.readFile(`${this.archivo}`, `utf-8`)
            .then((products) => {
                let allProducts = JSON.parse(products);

                for (let i = 0; i < allProducts.length; i++) {
                    if (allProducts[i].id == id) {
                        product = allProducts[i];
                    }
                }
                console.log("producto seleccionado", product);
            })
            .catch(err => {
                console.error(err);
            })
    }

    getAll() {
        let allProducts;
        fs.promises.readFile(`${this.archivo}`, `utf-8`)
            .then((products) => {
                allProducts = JSON.parse(products);
                return allProducts;
            })
            .then((products) => {
                console.table(products);
            })
            .catch(err => {
                console.error(err);
            })
    }

    deleteById(id) {
        let product = null;
        fs.promises.readFile(`${this.archivo}`, `utf-8`)
            .then((products) => {
                let allProducts = JSON.parse(products);
                let prodcuts = [];

                for (let i = 0; i < allProducts.length; i++) {
                    if (allProducts[i].id == id) {
                        product = allProducts[i];
                    }else{
                        prodcuts.push(allProducts[i]);
                    }
                }
                return prodcuts;
            })
            .then((products) => {
                fs.promises.writeFile(`${this.archivo}`, " ");
                fs.promises.writeFile(`${this.archivo}`, JSON.stringify(products));
            })

            .catch(err => {
                console.error(err);
            })
    }

    deleteAll() {
        fs.promises.readFile(`${this.archivo}`, `utf-8`)
            .then(() => {
                return fs.promises.writeFile(`${this.archivo}`, " ");
            })
            .catch(err => {
                console.error(err);
            })
    }

    upId() {
        Contenedor.id++;
        console.log("id asignado", Contenedor.id);
    }

}


const cont = new Contenedor("productos.txt");

cont.save({ title: "aaa", precio: 111, thumbnail: "prueba1" });
cont.save({ title: "bbb", precio: 222, thumbnail: "prueba2" });
cont.save({ title: "ccc", precio: 333, thumbnail: "prueba3" });
cont.save({ title: "ddd", precio: 444, thumbnail: "prueba4" });
//cont.getById(1);
//cont.getById(2);
//cont.getAll();
//cont.deleteAll();
//cont.deleteById(1);
//cont.deleteById(2);
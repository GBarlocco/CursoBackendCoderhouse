/*
Utilizando Mongo Shell, crear una base de datos llamada ecommerce que contenga dos colecciones: mensajes y productos.
use ecommerce
*/

/*
1) Agregar 10 documentos con valores distintos a las colecciones mensajes y productos. 
El formato de los documentos debe estar en correspondencia con el que venimos utilizando en el entregable con base de datos MariaDB. 
*/

db.createCollection('messages');
db.createCollection('products');

const mensajes = [
    {
        text: "mensaje 1",
        time: "18:5",
        user: 'usuario1@gmail.com'
    },
    {
        text: "mensaje 2",
        time: "18:5",
        user: 'usuario2@gmail.com'
    },
    {
        text: "mensaje 3",
        time: "18:5",
        user: 'usuario1@gmail.com'
    },
    {
        text: "mensaje 4",
        time: "18:5",
        user: 'usuario2@gmail.com'
    },
    {
        text: "mensaje 5",
        time: "18:5",
        user: 'usuario1@gmail.com'
    },
    {
        text: "mensaje 6",
        time: "18:5",
        user: 'usuario2@gmail.com'
    },
    {
        text: "mensaje 7",
        time: "18:5",
        user: 'usuario1@gmail.com'
    },
    {
        text: "mensaje 8",
        time: "18:5",
        user: 'usuario2@gmail.com'
    },
    {
        text: "mensaje 9",
        time: "18:5",
        user: 'usuario1@gmail.com'
    },
    {
        text: "mensaje 10",
        time: "18:5",
        user: 'usuario2@gmail.com'
    },
];

// Agregamos 10 mensajes
db.messages.insertMany(mensajes);

// Productos
const productos = [
    {
        title: "producto 1",
        price: 123,
        thumbnail: "url 1",
    },
    {
        title: "producto 2",
        price: 123,
        thumbnail: "url 2",
    },
    {
        title: "producto 3",
        price: 123,
        thumbnail: "url 3",
    },
    {
        title: "producto 4",
        price: 123,
        thumbnail: "url 4",
    },
    {
        title: "producto 5",
        price: 123,
        thumbnail: "url 5",
    },
    {
        title: "producto 6",
        price: 123,
        thumbnail: "url 6",
    },
    {
        title: "producto 7",
        price: 123,
        thumbnail: "url 7",
    },
    {
        title: "producto 8",
        price: 123,
        thumbnail: "url 8",
    },
    {
        title: "producto 9",
        price: 123,
        thumbnail: "url 9",
    },
    {
        title: "producto 10",
        price: 123,
        thumbnail: "url 10",
    },
];

// Agregamos 10 productos
db.products.insertMany(productos);

/*
2) Definir las claves de los documentos en relación a los campos de las tablas de esa base. 
En el caso de los productos, poner valores al campo precio entre los 100 y 5000 
pesos(eligiendo valores intermedios, ej: 120, 580, 900, 1280, 1700, 2300, 2860, 3350, 4320, 4990). 
*/

db.products.update({ title: 'producto 1' }, { $set: { 'price': 100 } });
db.products.update({ title: 'producto 2' }, { $set: { 'price': 280 } });
db.products.update({ title: 'producto 3' }, { $set: { 'price': 1350 } });
db.products.update({ title: 'producto 4' }, { $set: { 'price': 1999 } });
db.products.update({ title: 'producto 5' }, { $set: { 'price': 2500 } });
db.products.update({ title: 'producto 6' }, { $set: { 'price': 2700 } });
db.products.update({ title: 'producto 7' }, { $set: { 'price': 3100 } });
db.products.update({ title: 'producto 8' }, { $set: { 'price': 4200 } });
db.products.update({ title: 'producto 9' }, { $set: { 'price': 4900 } });
db.products.update({ title: 'producto 10' }, { $set: { 'price': 5000 } });

/*
3) Listar todos los documentos en cada colección.
 */

db.products.find();
db.messages.find();

/*
4) Mostrar la cantidad de documentos almacenados en cada una de ellas.
*/

db.products.count();
db.messages.count();

// 5)  Realizar un CRUD sobre la colección de productos:

    // a) agregar un producto más en la colección de productos:

    const newProduct =
    {
        title: "producto nuevo",
        price: 123,
        thumbnail: "url nuevo",
    };

    db.products.insertOne(newProduct);
    db.products.find();

    db.products.update({ title: 'producto nuevo' }, { $set: { 'price': 4999 } });

    // b) Realizar una consulta por nombre de producto específico:

        // i) listar los productos con precio <1000

        db.products.find({ price: { $lt: 1000 } });

        // ii) listar los productos con precio >1000 <3000
        db.products.find({ price: { $gt: 1000, $lt: 3000 } });

        // iii) listar los productos con precio > 3000
        db.products.find({ price: { $gt: 3000 } });

        // iv) obtener el tercer producto mas barato:
        //FALTA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        db.products.find().sort({ price: -1 }).skip(db.products.count() - 3).limit(1);

        // c) hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100
        db.products.updateMany({}, { $set: { stock: 100 } });

        // d) cambiar el stock a cero de los productos con precios mayores a 4000 pesos.
        db.products.updateMany({ price: { $gt: 4000 } }, { $set: { "stock": 0, } });

        // e) Borrar los productos con precio menos a 1000 pesos.
        db.products.deleteMany({ price: { $lt: 1000 } });

// 6) Crear un usuario 'pepe' clave: 'asd456' que solo pueda leer la base de datos ecommerce.

//use admin;
db.createUser({ user: 'pepe', pwd: 'asd456', roles: [{ role: 'read', db: 'ecommerce' }] });

// Verificar que pepe no pueda cambiar la informacion
/*
    //user & pass
    mongo -u pepe -p asd456

    //Verificamos si podemos leer los posts
    use ecommerce

    //Obtenemos respuesta correctamente, mostrando los dos documentos 

    //Ahora intentaremos insertar un nuevo documento
    
    const newProduct =
    {
        title: "producto nuevo",
        price: 123,
        thumbnail: "url nuevo",
    };

    db.products.insertOne(newProduct);

    // Error

*/

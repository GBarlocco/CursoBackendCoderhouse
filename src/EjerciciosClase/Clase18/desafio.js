db.clientes.insertOne({ name: 'Jaime', edad: 34 })

const clientes = [
    { name: 'Adrian', edad: 23 },
    { name: 'Javier', edad: 40 },
    { name: 'Carlos', edad: 34 }
]

db.clientes.insertMany(clientes)

const articulos = [
    {
        name: 'Coca Cola',
        precio: 12.21,
        stock: 100
    },
    {
        name: 'Fanta',
        precio: 14.24,
        stock: 80
    },
    {
        name: 'Sprinte',
        precio: 11.21,
        stock: 200
    },
    {
        name: 'Agua natural',
        precio: 9.21,
        stock: 100
    }
]

db.articulos.insertMany(articulos)

db.articulos.countDocuments()

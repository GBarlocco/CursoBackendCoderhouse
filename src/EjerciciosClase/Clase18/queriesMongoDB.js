db.clientes.find({ edad: 28 }) // obtengo todos los clientes (colección) con edad = 28

db.clientes.find({ $and: [{ name: 'Jaime' }, { edad: 40 }] }); // obtengo los clientes que posean el nombre = jaime y edad = 40

db.clientes.find({ name: 'jaime' }, { edad: 40 }); // and implícito, es el único operador que podremos utilizar de forma implícito 

db.clientes.find({ $or: [{ name: 'Pepe' }, { edad: 28 }] });

db.clientes.find({ edad: { $gt: 34 } }); //edad > 34

db.clientes.find({ edad: { $gte: 34 } }); //edad >= 34

db.clientes.find({ edad: { $lt: 34 } }); //edad < 34

db.clientes.find({ edad: { $lte: 34 } }); //edad <= 34

db.clientes.find({ name: { $ne: 'Carlos' } }); // name != "carlos"

db.clientes.find({ name: { $eq: 'Carlos' } }); // name == "carlos"

db.clientes.find({ name: 'Carlos' }); // name == "carlos"

db.articulos.articulos.find({ inStore: { $exists: true } }); // filtramos los articulos en donde exista el campo "inStore" 

db.articulos.articulos.find({ inStore: { $exists: false } }); // filtramos los articulos en donde NO existe el campo "inStore" 

db.clientes.find({ name: { $in: ['Jaime', 'Carlos'] } }); // obtenemos todo la info de los clientes que posean los nombres: Jaime, Carlos.

db.clientes.find({ name: { $nin: ['Jaime', 'Carlos'] } }); // lo inverso a $in


const newClients = [
    {
        name: 'Joaquin',
        edad: 23,
        cursos: [
            'Desarrollo Web',
            'React JS',
            'Programaciòn Backend'
        ]

    },
    {
        name: 'Alma',
        edad: 23,
        cursos: [
            'Desarrollo Web',
            'Programaciòn Backend'
        ]
    },
    {
        name: 'Sofia',
        edad: 23,
        cursos: [
            'React JS',
            'Programaciòn Backend'
        ]
    },
    {
        name: 'Jorge',
        edad: 23,
        cursos: [
            'Desarrollo Web',
            'React JS',
            'Programaciòn Backend'
        ]
    },
];


db.clientes.find({ cursos: { $size: 3 } });

db.clientes.find({ cursos: { $all: ['Desarrollo Web', 'React JS', 'Programaciòn Backend'] } });

db.clientes.distinct('edad'); // Nos devuelve un array con el valor de las edades

db.clientes.distinct('name'); // Nos devuelve un array con el valor de los nombres

db.clientes.find({ name: /^J/ }) //  Nos los clientes que su nombre comience con la letra A


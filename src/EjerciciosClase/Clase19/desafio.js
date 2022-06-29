const mongoose = require('mongoose');

//db
const URL = 'mongodb://127.0.0.1:27017/colegio';

const db = mongoose.connect(URL, {
    useNewUrlParser: true
});

// creo el schema y modelo
const estudiantesSchema = new mongoose.Schema({
    nombre: { type: String, required: true, max: 15 },
    apellido: { type: String, required: true, max: 15 },
    edad: { type: Number, required: true, max: 80 },
    dni: { type: String, required: true, max: 15, unique: true },
    curso: { type: String, required: true, max: 20 },
    nota: { type: Number, required: true, max: 12 },
});

//Creo el Schema
const pruebaSchema = new mongoose.Schema({
    nombre: { type: String, required: true, max: 15 },

});

//Creo la colección
const moodelEstudiantes = mongoose.model(`Estudiantes`, estudiantesSchema);

const estudiantes = [
    {
        nombre: 'Pedro',
        apellido: 'Mei',
        edad: 21,
        dni: '31155898',
        curso: '1A',
        nota: 7
    },
    {
        nombre: 'Ana',
        apellido: 'Gonzalez',
        edad: 32,
        dni: '27651878',
        curso: '1A',
        nota: 8
    },
    {
        nombre: 'José',
        apellido: 'Picos',
        edad: 29,
        dni: '34554398',
        curso: '2A',
        nota: 6
    },
    {
        nombre: 'Lucas',
        apellido: 'Blanco',
        edad: 22,
        dni: '30355874',
        curso: '3A',
        nota: 10
    },
    {
        nombre: 'María',
        apellido: 'García',
        edad: 36,
        dni: '29575148',
        curso: '1A',
        nota: 9
    },
    {
        nombre: 'Federico',
        apellido: 'Perez',
        edad: 41,
        dni: '320118321',
        curso: '2A',
        nota: 5
    },
    {
        nombre: 'Tomas',
        apellido: 'Sierra',
        edad: 19,
        dni: '38654790',
        curso: '2B',
        nota: 4
    },
    {
        nombre: 'Carlos',
        apellido: 'Fernández',
        edad: 33,
        dni: '26935670',
        curso: '3B',
        nota: 2
    },
    {
        nombre: 'Fabio',
        apellido: 'Pieres',
        edad: 39,
        dni: '4315388',
        curso: '1B',
        nota: 9
    },
    {
        nombre: 'Daniel',
        apellido: 'Gallo',
        edad: 25,
        dni: '37923460',
        curso: '3B',
        nota: 2
    }
];


db
    .then(_ => moodelEstudiantes.insertMany(estudiantes))
    .catch(err => console.log(`Error: ${err.message}`))
    .finally(() => process.exit());

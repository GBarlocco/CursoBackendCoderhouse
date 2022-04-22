class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        return `Nombre: ${this.nombre} Apellido: ${this.apellido}`;
    }

    addMascota(newMascota) {
        this.mascotas.push(newMascota);
    }

    countMascotas() {
        return this.mascotas.length;
    }

    addBook(nameBook, nameAuth) {
        this.libros.push({ nombre: nameBook, autor: nameAuth });
    }

    getBookNames() {
        let bookName = this.libros.map((book) => {
            return book.nombre;
        })

        return bookName;
    }
}

let libros1 = [
    {
        nombre: "Nombre Libro 1",
        autor: "autor1"
    },
    {
        nombre: "Nombre Libro 2",
        autor: "autor2"
    }
];

const mascotas1 = [`mascota1`, `mascota2`, `mascota3`];

const usuario1 = new Usuario(`Gastón`, `Barlocco`, libros1, mascotas1);

console.log(usuario1.getFullName());

console.log(`Total de mascotas`, usuario1.countMascotas());

usuario1.addMascota(`mascota4`);

console.log(`Total de mascotas`, usuario1.countMascotas());

console.log(`libros`, usuario1.getBookNames());

usuario1.addBook(`Nombre Libro nuevo`, `autor nuevo`);

console.log(`libros`, usuario1.getBookNames());
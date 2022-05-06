class Persona {
    constructor (nombre, edad){
        this.nombre = nombre;
        this.edad = edad;
    };

    static saludoCorto = `Hola`;

    saludoCompleto (){
        console.log(`Hola!!!, soy ${this.nombre}`);
    };

    static saludoStatic (){
        console.log(Persona.saludoCorto);
    };
}

const pepe = new Persona (`Pepe`, 30);
console.log(pepe);

pepe.saludoCompleto();

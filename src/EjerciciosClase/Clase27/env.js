const dotenv = require(`dotenv`);
const path = require(`path`);

dotenv.config(); //lee el archivo con nombre .env y setea las variables como variables de entorno

console.log(process.env); //Se peuden visualizar las variables, las mismas se pueden utilizar en cualquier parte del programa.

//Se suele realizar un documento ".env.example" el cual se sube al repo, con ejemplos.


//Seleccion entre dos configuraciones .env: local.env / prod.env:

const mode = `local` // local / prod

const fileEnv = path.resolve(__dirname, `${mode}.env`);
console.log(dotenv.config())
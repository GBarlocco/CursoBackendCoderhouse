/*
1-Vamos a trabajar con el objeto del blog, pero ahora añadiéndole información redundante que va a ser optimizada por Normalizr.
2-Dispondremos de un array de artículos, donde habrá autores y comentadores.
3-El autor de un artículo puede ser comentador de otro y viceversa.
4-De esta manera habrá duplicación de información, lo que producirá que el objeto no posea información centralizada y sea más extenso.
5-Definiremos un conjunto de esquemas para quitar esas redundancias.
6-Primero mostraremos el objeto original y su longitud en bytes, luego normalizaremos y comprobaremos los datos.
7-Por último desnormalizaremos, verificando los datos originales.
*/

/*
Estructura:
    |entidad principal Blog:
                            |dentro de Blog entidad existe un array de posts:
                                                                        |dentro de posts tendremos author
                                                                        |dentro de posts tendremos un arreglo de comments
                                                                                                            |dentro de comments tendremos al commenter

commenter = author => user
*/

const { normalize, denormalize, schema } = require(`normalizr`);
const blog = require(`./blog.json`);
const util = require(`util`);

const print = (objeto) => {
    console.log(util.inspect(objeto, false, 12, true));
}

/*
    Para realizar los esquemas comenzamos desde los simples hasta llegar al más completo, en este caso comenzamos con user, 
    y al final configuramos el blog como tal.
*/

//Esquema simple. commenter = author => user
const userSchema = new schema.Entity(`users`);

//Esquema anidado:
const commentSchema = new schema.Entity(`comments`, {
    commenter: userSchema
});

//Esquema anidado:
const postSchema = new schema.Entity('posts', {
    author: userSchema,
    comments: [commentSchema]
});

const blogSchema = new schema.Entity(`blog`, {
    posts: [postSchema]
});

console.log(`==== OBJETO ORIGINAL ====`);
console.log(`Tamaño [bytes]: ${JSON.stringify(blog).length}`);
print(blog);

console.log(`==== OBJETO NORMALIZADO ====`);
const normalizedBlog = normalize(blog, blogSchema);
console.log(`Tamaño [bytes]: ${JSON.stringify(normalizedBlog).length}`);
print(normalizedBlog);

console.log(`==== OBJETO DENORMALIZADO ====`);
const denormalizedBlog = denormalize(normalizedBlog.result, blogSchema, normalizedBlog.entities);
console.log(`Tamaño [bytes]: ${JSON.stringify(denormalizedBlog).length}`);
print(denormalizedBlog);


console.log(`================================ `);
console.log(`====== RESUMEN DE TAMAÑOS ====== `);

console.log(`==== OBJETO ORIGINAL ====`);
console.log(`Tamaño [bytes]: ${JSON.stringify(blog).length}`);

console.log(`==== OBJETO NORMALIZADO ====`);
console.log(`Tamaño [bytes]: ${JSON.stringify(normalizedBlog).length}`);

console.log(`==== OBJETO DENORMALIZADO ====`);
console.log(`Tamaño [bytes]: ${JSON.stringify(denormalizedBlog).length}`);

console.log(`¿Datos normalizados = datos denormalizados? ${JSON.stringify(blog) === JSON.stringify(denormalizedBlog)}`);
console.log(`================================ `);
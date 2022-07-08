const normalizr = require(`normalizr`);
const blogpost = require(`./blogpost.json`);

const fs = require('fs');

const authorSchema = new normalizr.schema.Entity('authors');

const commentSchema = new normalizr.schema.Entity('comments');

const postSchema = new normalizr.schema.Entity('posts', {
    author: authorSchema,
    comments: [commentSchema],
});

const normalizedBlogpost = normalizr.normalize(blogpost, postSchema);

const denormalizedBlogpost = normalizr.denormalize(normalizedBlogpost.result, postSchema, normalizedBlogpost.entities);

; (async () => {
    try {
        const writePost = await fs.promises.writeFile('./normalizedBlogpost.json', JSON.stringify(normalizedBlogpost, null, 2));
        console.log('Ok');
    } catch {
        throw new Error(`Error al escribir el archivo`);
    }
})();


; (async () => {
    try {
        const writePost = await fs.promises.writeFile('./denormalizedBlogpost.json', JSON.stringify(denormalizedBlogpost, null, 2));
        console.log('Ok');
    } catch {
        throw new Error(`Error al escribir el archivo`);
    }
})();
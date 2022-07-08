const normalizr = require(`normalizr`);
const fs = require(`fs`);

const blogposts = require('./blogposts.json');

const authorSchema = new normalizr.schema.Entity('authors');

const commentSchema = new normalizr.schema.Entity('comments');

const postSchema = new normalizr.schema.Entity('posts', {
    author: authorSchema,
    comments: [commentSchema],
});

const postArray = new normalizr.schema.Array(postSchema);

const normalizedBlogposts = normalizr.normalize(blogposts, postArray);

; (async () => {
    try {
        const writePost = await fs.promises.writeFile('./normalizedBlogposts.json', JSON.stringify(normalizedBlogposts, null, 2));
        console.log('Ok');
    } catch {
        throw new Error(`Error al escribir el archivo`);
    }
})();

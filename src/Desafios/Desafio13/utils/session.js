const session = require(`express-session`);
const MongoStore = require(`connect-mongo`);

optionsMongo = { useNewUrlParser: true, useUnifiedTopology: true };

const sessionConfig = session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://gaston:plcJVQX38JLWkNty@cluster0.opdu9wz.mongodb.net/desafio12?retryWrites=true&w=majority",
        mongoOptions: optionsMongo,
        ttl: 10
    }),
    secret: '123456',
    resave: true,
    saveUninitialized: true
});

module.exports = { sessionConfig }

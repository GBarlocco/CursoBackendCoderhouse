const express = require(`express`);
const session = require(`express-session`);

const redis = require(`redis`);

const passport = require(`passport`);
const { Strategy: FacebookStrategy } = require(`passport-facebook`);

const clientRedis = redis.createClient({
    legacyMode: true
});

clientRedis.connect();

const app = express();

app.use(session({
    secret: `12345`,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    clientRedis.set(`user:${user.id}`, JSON.stringify(user), err => {
        if (err) {
            return done(err, false)
        }
        return done(null, user.id)
    });
});

passport.deserializeUser((id, done) => {
    console.log('deserializeUser')
    clientRedis.get(`user:${id}`, (err, value) => {
        if (err) {
            return done(err, false)
        }
        return done(null, JSON.parse(value))
    });
});

const facebookCallback = (token, tokenSecret, profile, done) => {
    console.log({ token, tokenSecret, profile });

    return done(null, profile._json);
};

const facebookStrategy = new FacebookStrategy({
    clientID: `2342551809219858`,
    clientSecret: `53aee1103f7cab469dc9a7b0f149f6c6`,
    callbackURL: `http://localhost:8080/auth/facebook/callback`
}, facebookCallback);

passport.use(facebookStrategy);

app.get(`/auth/facebook`, passport.authenticate(`facebook`));

app.get(`/auth/facebook/callback`, passport.authenticate(`facebook`, {
    successRedirect: '/profile',
    failureRedirect: `/login`
}));

app.get(`/profile`, (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ error: `Necesitas iniciar sesión` });
}, (req, res) => {
    return res.json({
        user: req.user,
        session: req.session
    }); //con passport obtenemos directamente el usuario con req.user
});

app.get(`/test`, (req, res) => {
    return res.send(`Test ok`);
});

const PORT = 8080;
app.listen(PORT, () => console.log(`servidor escuchando en el puerto ${PORT}`));
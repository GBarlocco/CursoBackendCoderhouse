const express = require('express')
const session = require('express-session')

const redis = require('redis')

const passport = require('passport')
const { Strategy: FacebookStrategy } = require('passport-facebook')
const { Strategy: TwitterStrategy } = require('passport-twitter')

const redisClient = redis.createClient({
    legacyMode: true
})

redisClient.connect()

const app = express()

app.use(session({
    secret: 'qwerty',
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

const facebookCallback = (token, tokenSecret, profile, done) => {
    console.log({ token, tokenSecret, profile })

    return done(null, profile._json)
}

const facebookStrategy = new FacebookStrategy({
    clientID: '2342551809219858',
    clientSecret: '53aee1103f7cab469dc9a7b0f149f6c6',
    callbackURL: 'http://localhost:8080/auth/facebook/callback'
}, facebookCallback)

passport.use(facebookStrategy)

passport.use(new TwitterStrategy({
    consumerKey: '8Y1gFGDZXMsY1QGqvQVozbjDt',
    consumerSecret: '7HrZGbBq6XAJu8LeroOphXTd4GYSkhSBpwKLDgdUVvaw2FJsJP',
    callbackURL: 'http://localhost:8080/auth/twitter/callback'
}, (token, tokenSecret, profile, done) => {
    console.log({ token, tokenSecret, profile })

    return done(null, {
        id: profile._json.id,
        name: profile._json.name
    })
}))

passport.serializeUser((user, done) => {
    console.log(`serializeUser`)
    redisClient.set(`user:${user.id}`, JSON.stringify(user), err => {
        if (err) {
            return done(err, false)
        }

        return done(null, user.id)
    })

})

passport.deserializeUser((id, done) => {
    console.log('deserializeUser')
    redisClient.get(`user:${id}`, (err, value) => {
        if (err) {
            return done(err, false)
        }

        return done(null, JSON.parse(value))
    })
})

app.get('/auth/facebook', passport.authenticate('facebook'))

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/login'
}))

app.get('/auth/twitter', passport.authenticate('twitter'))

app.get('/auth/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/profile',
    failureRedirect: '/login'
}))

app.get('/profile', (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }

    return res.status(401).json({ error: 'Necesitas iniciar sesión' })
}, (req, res) => {
    return res.json({
        user: req.user,
        session: req.session
    })
})

const PORT = 8080

app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`))
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const UserModel = require(`../dataBase/models/user`);

const { isValidPassword } = require('../utils/utils');

const log4js = require('../utils/logs');

const loggerArchiveError = log4js.getLogger(`errorArchive`);

const login = () => {
    /*
    strategySignup:
    passport por defecto toma el username & password de req.body.username, req.body.password,
    en nuestro modelo para ingresar a la DB tenemos también email, entonces, para obtener el
    email indicamos que queremos recibir todo el req.
    */

    passport.use('login', new LocalStrategy({
        //Configuración para obtener todo el req.
        passReqToCallback: true
    }, async (req, username, password, done) => {
        try {
            const user = await UserModel.findOne({ username });
            if (!user) {
                return done(null, false);
            }
            if (!isValidPassword(user.password, password)) {
                return done(null, false);
            }
            return done(null, user);
        }
        catch (err) {
            loggerArchiveError.error(err);
            done(err);
        }
    }));
}

module.exports = login;
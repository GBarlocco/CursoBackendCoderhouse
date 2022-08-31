const passport = require('passport');
const UserModel = require(`../dataBase/models/user`);
const log4js = require('../utils/logs');

const loggerArchiveError = log4js.getLogger(`errorArchive`);

const deserializeUser = () => {
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await UserModel.findById(id);
            done(null, user);
        } catch (err) {
            loggerArchiveError.error(err);
            done(err);
        }
    });
}

module.exports = deserializeUser;
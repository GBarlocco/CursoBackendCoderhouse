const passport = require('passport');
const UserModel = require(`../db/models/user`);

const deserializeUser = () => {
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await UserModel.findById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
}

module.exports = deserializeUser;
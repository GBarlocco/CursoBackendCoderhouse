const passport = require('passport');

const serializeUser = () => {
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
}

module.exports = serializeUser;
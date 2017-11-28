module.exports = (env) => {
    const passport = require('passport');
    const LocalStrategy = require('./localStrategy');
    const User = require('../db/models/user');

    passport.serializeUser((id, done) => {
        done(null, { _id: user._id });
    });

    passport.deserializeUser((id, done) => {
        User.findOne({ _id: id },
            'local.username',
            (err, user) => {
                done(null, user);
            });
    });


    passport.use(LocalStrategy);

    return passport;
}
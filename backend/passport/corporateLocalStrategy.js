const CorporateUser = require('../db/models/user').corporate;
const LocalStrategy = require('passport-local').Strategy;

// Standard Local Strategy, connected to the CorporateUser collection
const strategy = new LocalStrategy(
    {
        usernameField: 'email'
    },
    (username, password, done) => {
        CorporateUser.findOne({'email': username}, (err, userMatch) => {
            if (err)
                return done(err);

            // Check users for authentication
            if (!userMatch)
                return done(null, false, {message: 'Incorrect Email'});
            // Use industry standard cryptographically secure password library bcrypt to check passwords
            if (!userMatch.checkPassword(password))
                return done(null, false, {message: 'Incorrect password'});

            // if all pass, then user has logged in
            return done(null, userMatch);
        });
    });

module.exports = strategy;
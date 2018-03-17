// References:
// Multiple User types
// Reference:  https://github.com/jaredhanson/passport/issues/50
// Line: 12

module.exports = (env) => {
    const passport = require('passport');
    const IndividualLocalStrategy = require('./individualLocalStrategy');
    const CorporateLocalStrategy = require('./corporateLocalStrategy');
    const User = require('../db/models/user');

    // Custom serialization function which allows for multiple users
    passport.serializeUser((user, done) => {

        // Identify whether the user is a corporate user by whether they have a company field
        // as only corporate users have them
        let type = "company" in user ? 'CORPORATE' : 'INDIVIDUAL';

        // after initial serialization, add an extra field to the user object,
        // a type field, with values of either CORPORATE or INDIVIDUAL
        done(null, { id: user._id, type });
    });

    // When deserializing users, depending on their type field, use either the Corporate or Individual database
    passport.deserializeUser((key, done) => {
        if (key.type === 'CORPORATE') {
           User.corporate.findOne({_id: key.id}, (err, user) => { 
               done(null, user)
            }) ;
        } else if (key.type === 'INDIVIDUAL') {
           User.individual.findOne({_id: key.id}, (err, user) => { 
               done(null, user)
            });
        } else {
            // If the type is neither, then this is an undefined state
            done(null, null);
        }
   });


    // Instruct the passport library to use both strategies for logging in users.
    passport.use('individual', IndividualLocalStrategy);
    passport.use('corporate', CorporateLocalStrategy);

    return passport;
};
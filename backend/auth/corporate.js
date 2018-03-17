// Utility function to sanitize user objects to remove Personally Identifiable information
function sanitizeUser(user) {
    return {
        email: user.email
    };
}

module.exports = (env, passport) => {
    const express = require('express');
    const router = express.Router();
    const CorporateUser = require('../db/models/user').corporate;
    const Company = require('../db/models/company');
    const sanitizeError = require('../sanitizeError');

    // Utility function to create a new corporate user
    function storeUser(username, password, id, callback) {
        const newUser = new CorporateUser({
            'email': username,
            'password': password,
            'company': id
        });


        newUser.save((err, savedUser) => {
            if (err) {
                if (!env.PRODUCTION) {
                    return callback({error: err});
                } else {
                    return callback({error: 'UNKNOWN'});
                }
            } else {
                return callback(sanitizeUser(savedUser));
            }
        });
    }

    // POST requests to the login endpoint will return a session store header response, informing the browser
    // to persist the session (if logged in)
    router.post('/login',
        (req, res, next) => {
            next();
        },
        // use the passport authentication middleware to authenticate the user
        passport.authenticate('corporate'),
        (req, res) => {
            // once authenticated, return a sanitized user object
            return res.json({user: sanitizeUser(req.user)});
        });

    // POST requests to the logout endpoint will return a session delete header response, informing browsers to
    // remove the session - alongside this the server side cookie will also be removed
    router.post('/logout', (req, res) => {
        // Check that the user is logged in, before trying to log out
        if (req.user) {
            // destroy the user's session
            req.session.destroy();
            // clear the user's cookie
            res.clearCookie();

            return res.json({msg: 'LOGGED_OUT'});
        } else {
            res.json({error: 'NO_USER'});
        }
    });


    // Utility endpoint supported only in TEST environments, allowing test runners to delete users
    // useful for undoing state changes during unit tests
    router.post('/clear', (req, res, next) => {
        // IMPORTANT: Deleting users is a irreversible action and should only be supported in test environments
        if (env.TEST) {
            const {email} = req.body;
            CorporateUser.findOneAndRemove({email: email}, (err, user) => {
                res.status(200).send();
            })
        } else {
            res.status(404).send();
        }
    });

    // Unused endpoint for signing up users - not required as part of system specification, but useful for testing
    // NOTE: No parameter checking is done on this endpoint and thus it is not production ready.
    // router.post('/signup', (req, res) => {
    //     const {email, password, domain, name} = req.body;
    //
    //
    //     CorporateUser.findOne({'email': email}, (err, userMatch) => {
    //         if (err)
    //             return res.json(sanitizeError(env, err));
    //         if (userMatch) {
    //             return res.json({
    //                 error: 'USER_EXISTS'
    //             });
    //         }
    //
    //         Company.findOne({"domain": domain}, (err, companyMatch) => {
    //             if (err)
    //                 return res.json(sanitizeError(env, err));
    //             if (companyMatch) {
    //                 if (companyMatch.name != name) {
    //                     return res.json({
    //                         error: 'COMPANY_NAME_DOES_NOT_MATCH'
    //                     });
    //                 }
    //                 storeUser(email, password, companyMatch._id, (data) => {
    //                     return res.json(data);
    //                 })
    //
    //             } else {
    //                 new Company({
    //                     'domain': domain,
    //                     'name': name
    //                 }).save((err, savedCompany) => {
    //                     if (err) {
    //                         return res.json(sanitizeError(env, err));
    //                     }
    //
    //                     storeUser(email, password, savedCompany._id, (data) => {
    //                         return res.json(data);
    //                     })
    //                 });
    //
    //
    //             }
    //         });
    //     });
    // });


    return router;
};
// Utility function to sanitize user objects to remove Personally Identifiable information
function sanitizeUser(user) {
    return {
        email: user.email,
        name: user.name
    };
}

module.exports = (env, passport) => {
    const express = require('express');
    const router = express.Router();
    const IndividualUser = require('../db/models/user').individual;
    const sanitizeError = require('../sanitizeError');

    // POST requests to the login endpoint will return a session store header response, informing the browser
    // to persist the session (if logged in)
    router.post('/login',
        // use the passport library with the individual strategy to login
        passport.authenticate('individual'),
        (req, res) => {
            console.log(JSON.stringify(req.body));
            res.json({user: sanitizeUser(req.user)});
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
        if (env.TEST) {
            const {email} = req.body;
            IndividualUser.findOneAndRemove({email: email}, (err, user) => {
                res.status(200).send();
            })
        } else {
            res.status(404).send();
        }
    });


    // Unused endpoint for signing up users - not required as part of system specification, but useful for testing
    // NOTE: No parameter checking is done on this endpoint and thus it is not production ready.
    // router.post('/signup', (req, res) => {
    //     const {email, password, name} = req.body;
    //     IndividualUser.findOne({'email': email}, (err, userMatch) => {
    //         if (err) {
    //             return res.json(sanitizeError(env, err));
    //         }
    //
    //         if (userMatch) {
    //             return res.json({
    //                 error: 'USER_EXISTS'
    //             });
    //         }
    //
    //         const newUser = new IndividualUser({
    //             'email': email,
    //             'password': password,
    //             "name": name
    //         });
    //
    //
    //         newUser.save((err, savedUser) => {
    //             if (err) {
    //                 return res.json(sanitizeError(env, err));
    //             } else {
    //                 return res.json({
    //                     email: savedUser.email,
    //                     name: savedUser.name
    //                 });
    //             }
    //         });
    //     });
    // });

    return router;
};

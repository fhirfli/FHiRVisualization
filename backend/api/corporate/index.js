// This is where all endpoints specific to coporate users are referenced
module.exports = (env) => {
    const express = require('express');
    const router = express.Router();
    const preferences = require('./preferences');
    const associations = require('./associations');
    const data = require('./data');

    // Ensure that all users accessing these endpoints are corporate users
    router.use((req, res, next) => {
        console.log("Accessing api");
        if (!req.user.isCorporate) {
            res.send(403, 'Unauthorized');
        } else {
            next();
        }
    });

    // Corporate specific endpoints
    preferences(env, router);
    associations(env, router);
    data(env, router);

    return router;
};
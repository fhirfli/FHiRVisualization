// Utility function to sanitize user objects to remove Personally Identifiable information
function sanitizeUser(user) {
    return {
        email: user.email,
        type: user.isCorporate ? 'CORPORATE' : 'INDIVIDUAL'
    };
}

// This module specifies all authentication related endpoints - all endpoints defined at this level are type independant
// they work for both corporate and individual users
module.exports = (env, passport) => {
    const express = require('express');
    const router = express.Router();
    const Individual = require('./individual')(env, passport);
    const Corporate = require('./corporate')(env, passport);

    // irrespective of the type of user, a GET request to user will return the user type and email
    router.get('/user', (req, res, next) => {
        if (req.user) {
            return res.json(sanitizeUser(req.user));
        } else {
            return res.json(null);
        }
    });

    // While user specific endpoints for logout are provided, a type independant endpoint is also provided
    router.post('/logout', (req, res) => {
        if (req.user) {
            req.session.destroy();
            res.clearCookie();
            return res.json({msg: 'LOGGED_OUT'});
        } else {
            res.json({error: 'NO_USER'});
        }
    });

    // All type specific endpoints are grouped under their respective url paths
    router.use('/individual', Individual);
    router.use('/corporate', Corporate);

    return router;
};
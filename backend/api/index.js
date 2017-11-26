module.exports = (env) => {
    const express = require('express');
    const router = express.Router();

    router.use((req, res, next) => {
        if(!req.user){
            res.send(403, 'Unauthorized');
        } else {
            next();
        }
    });


    return router;
}
function sanitizeUser(user) {

            user = JSON.parse(JSON.stringify(user));
            const cleanUser = Object.assign({}, user);

            return cleanUser;
}

module.exports = (env, passport) => {
    const express = require('express');
    const router = express.Router();
    const User = require('../db/models/user');

    router.get('/user', (req,res,next) => {
        if(req.user) {
            return res.json({user: req.user});
        } else {
            return res.json({user: null});
        }
    });


    router.post('/login', 
      passport.authenticate('local'),
        (req,res) => {
            console.log("Logged in buddy");
            // Needed to get remove all Mongoose bindings
            res.json({user: sanitizeUser(req.user)});
       });

        router.post('/logout', (req,res) =>{
            if(req.user) {
                req.session.destroy();
                res.clearCookie();
                return res.json({msg: 'LOGGED_OUT'});
            } else {
                res.json({error: 'NO_USER'});
            }
        });

        router.post('/signup', (req,res) => {
            const {username, password } = req.body;
            console.log(JSON.stringify(req.body));

            console.log("Signup called with " + username + ", " + password);

            User.findOne({'local.username': username}, (err, userMatch) => {
                console.log("Result recieved");
                if(userMatch) {
                    console.log("User exists");
                    return res.json({
                        error: 'USER_EXISTS'
                    });
                }

                const newUser = new User({
                    'local.username': username,
                    'local.password': password
                });


                newUser.save((err, savedUser) => {
                    if(err) {
                        if(!env.PRODUCTION) {
                            return res.json({error: err});
                        } else {
                            return res.json({error: 'UNKNOWN'});
                        }
                    } else {
                        return res.json(sanitizeUser(savedUser));
                    }
                });
            });
        });


        return router;
}
// This module organizes all the endpoints together to form a reusable expressjs router that can be a sub path of a
// larger project
module.exports = (env) => {
    const express = require('express');
    const bodyParser = require('body-parser');
    const session = require('express-session');
    const morgan = require('morgan');
    const dbConnection = require('./db')(env);
    const methodOverride = require('method-override');
    const MongoStore = require('connect-mongo')(session);


    // Router representing the root - can be used as a middleware itself, allowing for this whole tree of
    // endpoints to be a subpath of a larger system
    const router = express.Router();


    // Allow CORS
    // These functions return 200 responses to CORS requests - this allows the frontend to be hosted from a different
    // server to the backend increasing modularity
    router.use(methodOverride());
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        if ('OPTIONS' === req.method) {
            res.send(200);
        } else {
            next();
        }
    });

    // The routes on the system use URL parameters, and as such the following middleware enables that functionality
    router.use(
        bodyParser.urlencoded({
            extended: true
        })
    );

    // Body parser for supporting JSON post requests
    router.use(bodyParser.json());

    // Use the MongoDB to store sessions for the route - this increases scalability, as the alternative would be storing
    // them locally, which would be limited by the capabilities of the host OS's filesystem
    router.use(session({
        secret: env.SECRET,
        store: new MongoStore({mongooseConnection: dbConnection}),
        resave: false,
        saveUninitialized: false
    }));


    // Logging middleware to record all anomalous events to a log for later use
    if (env.PRODUCTION) {
        let accessLogStream = fs.createWriteStream(path.join(env.LOGDIR), {flags: 'a'});
        router.use(morgan(':method :url :status :res[content-length] - :response-time ms', {stream: accessLogStream}));
    }

    // Initialize the passport middleware, as it is used for authenticating access to this endpoint
    const passport = require('./passport')(env);
    router.use(passport.initialize());
    router.use(passport.session());


    // Authentication Endpoints Middleware
    const auth = require('./auth')(env, passport);
    router.use('/auth', auth);

    // API Endpoints Middleware
    const api = require('./api')(env);
    router.use('/api', api);


    // Final endpoint to catch any errors which are uncaught
    // return a 500 error and no error information to prevent leaking system information
    router.use((err, req, res, next) => {
        console.log('=========== ERROR ============');
        console.error(err.stack);
        res.status(500);
    });


    return router;
};
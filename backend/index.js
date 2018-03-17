// This module is the root module, from where execution starts.
// It sets up a server, attaches the endpoints and hosts the frontend.
const express = require('express');
const path = require('path');
const webpack = require('webpack');
const env = require('./env');
const http = require('http');


// Utility callback function to return human readable error messages when server errors occur
function onError(error) {
    // The only developer-related server errors are listen errors, otherwise, it's better to let the error propagate
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // Map from common listen error codes to human readable responses
    switch (error.code) {
        case 'EACCES':
            console.error(bind + " requires elevated priveleges");

            process.exit(1);
            break;

        case 'EADDRINUSE':
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            // if we haven't seen/don't know the error code, propagate the error.
            throw error;
    }
}

// Utility callback function to log that the server is online
function onListening() {
    let addr = server.address();
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log("listening on " + bind);
}

const app = express();
const main = require('./app')(env);
const cors = require('cors');


// Endpoint to support CORS on the frontend based requests
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});


// Main Backend Middleware
app.use(main);


// Hosting the Frontend
if (!env.PRODUCTION) {
    // If not in production, compile and hold the dashboard in memory rather than on file
    const webpackMiddleware = require('webpack-dev-middleware');
    const webpackDevMiddleware = require('webpack-hot-middleware');

    let config = require('../webpack.config.dev');
    let compiler = webpack(config);
    let DIR_DIST = path.resolve(__dirname, '../frontend', 'dist');

    // Utilty log function to aid developers
    app.use((req, res, next) => {
        console.log("Request Body: " + JSON.stringify(req.body));
        next();
    });

    // webpack middleware allows for in memory compilation
    app.use(webpackMiddleware(compiler, {
        publicPath: config.output.publicPath
    }));
    app.use(webpackDevMiddleware(compiler));
    app.use('/images', express.static(path.join(__dirname, '../frontend/src/images')));


    app.get('*', (req, res, next) => {
        const filename = path.join(DIR_DIST, 'index.html');

        compiler.outputFileSystem.readFile(filename, (err, result) => {
            if (err) {
                return next(err);
            }

            res.set('content-type', 'text/html');
            res.send(result);
            res.end();
        });

    })

}
else {

    // If not in development environment, then the website can just be served from the filesystem.
    // This expects that the user has already run yarn run build:production
    app.use('/static', express.static(path.join(__dirname, '../frontend/dist')));


    // Serve the project frontend at the website root.
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
    });


    // Redirect all requests not to the main backend to the system home page.
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });
}


// Initialize and run the server.
const server = http.createServer(app);

server.on('error', onError);
server.on('listen', onListening);
server.listen(env.PORT);

// Apache Drill Requests require a slightly increased time out
server.timeout = 320000;

console.log("Express " + env.PRODUCTION + " app listening on port " + env.PORT);

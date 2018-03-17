// This module handles initializing the MongoDB database connection
module.exports = (env) => {
    const mongoose = require('mongoose');
    mongoose.Promise = Promise;

    // Depending on whether the application is running in development or production, connect to
    // the correct database
    if(env.PRODUCTION) {
        console.log("Connecting to " + env.MONGODB_URL);
        mongoose.connect(env.MONGODB_URL, { useMongoClient: true});
    } else if (env.TEST) {
        console.log("Connecting to " + env.MONGODB_TEST_URL);
        mongoose.connect(env.MONGODB_TEST_URL, {useMongoClient: true});
    }
    else {
        console.log("Connecting to " + env.MONGODB_DEV_URL);
        mongoose.connect(env.MONGODB_DEV_URL, { useMongoClient: true});
    }

    const db = mongoose.connection;

    // Add utility callbacks to log errors or issues
    db.on('error', err => {
        console.log('There was an error connecting to the database: ' + err);
    });
    db.once('open', () => {
        console.log("Successfully connected to the database");
    });
    return db;
};
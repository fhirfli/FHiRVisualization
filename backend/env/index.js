// This module is used to provide a cross platform method of aggregating environment variables, and supporting defaults
// This module is loaded at initial launch and then subsequently dependancy injected into other components

// Print a log message to inform user that the environment object has been loaded (and display the environment as
// seen by nodejs)
console.log("Launching Server with Environment: "  + JSON.stringify(process.env, null, 3));

// Identify the mongodb port
const mongo_db_url = 'mongodb://' + process.env.DBNAME + ":" + process.env.KEY + "@" + process.env.DBNAME + ".documents.azure.com:" + process.env.COSMOSPORT + "/?ssl=true";
const mongo_db_local_url = process.env.MONGODB_LOCAL || mongo_db_url;
const mongo_db_test_url = process.env.MONGODB_TEST_URL || "mongodb://localhost:27017/test";

// identify and validate the server port
let port = parseInt(process.env.PORT, 10);
if(isNaN(port)) {
    throw new Error("Invalid value for PORT: " + process.env.PORT);
}
if(port < 0) {
    throw new Error("Invalid value for PORT: " + process.env.PORT);
}

// identify and validate the server session secret (can be any value)
let secret = process.env.SECRET;
if(secret === undefined){
    throw new Error('No Secret value set in env.');
}


// Determine whether running in development or production environments
let production;
let test = false;
if(process.env.NODE_ENV === 'production') {
    console.log("Starting server in PRODUCTION ENVIRONMENT");
    production = true;
} else if(process.env.NODE_ENV === 'development') {
    console.log("Starting server in DEVELOPMENT ENVIRONMENT");
    production = false;
} else if (process.env.NODE_ENV === 'test') {
    console.log("Starting server in TEST ENVIRONMENT");
    production = false;
    test = true;
}
else {
    throw new Error("Invalid value for NODE_ENV: " + process.env.NODE_ENV);
}

// Determine the apache drill endpoint
let drillUrl;
if (process.env.NODE_ENV === 'production') {
    drillUrl = 'http://apache:8047/query.json';
} else {
    drillUrl = 'http://localhost:8047/query.json';
}

// Return an object encapsulating all the logic required to validate and retrieve the environment variables
module.exports = {
    PORT: port,
    PRODUCTION: production, 
    MONGODB_URL: mongo_db_url,
    MONGODB_DEV_URL: mongo_db_local_url,
    MONGODB_TEST_URL: mongo_db_test_url,
    SECRET: secret,
    DRILL_URL: drillUrl,
    TEST: test
};
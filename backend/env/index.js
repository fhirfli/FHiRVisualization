
console.log("Launching Server with Environment: "  + JSON.stringify(process.env, null, 3));
const mongo_db_url = 'mongodb://' + process.env.DBNAME + ":" + process.env.KEY + "@" + process.env.DBNAME + ".documents.azure.com:" + process.env.COSMOSPORT + "/?ssl=true";
const mongo_db_local_url = process.env.MONGODB_LOCAL || mongo_db_url;

let port = parseInt(process.env.PORT, 10);
if(isNaN(port)) {
    throw new Error("Invalid value for PORT: " + process.env.PORT);
}
if(port < 0) {
    throw new Error("Invalid value for PORT: " + process.env.PORT);
}


let production;
if(process.env.NODE_ENV === 'production') {
    production = true;
} else if(process.env.NODE_ENV === 'development') {
    production = false;
} else {
    throw new Error("Invalid value for NODE_ENV: " + process.env.NODE_ENV);
}

module.exports = {
    PORT: port,
    PRODUCTION: production, 
    MONGODB_URL: mongo_db_url,
    MONGODB_DEV_URL: mongo_db_local_url
};
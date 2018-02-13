const mongoose = require('mongoose');
const request = require('request');
mongoose.Promise = Promise;
const user = require('./backend/db/models/user');
const data = require('./backend/db/models/data');
const goals = require('./backend/db/models/goal');
const snowmedCodes = require('./backend/db/models/FHiR/SnowmedCodes');
const Company = require('./backend/db/models/company');
const CompanyAssociation = require('./backend/db/models/companyAssociations');
const Goal = goals.Goal;
const IndividualUser = user.individual;
const CorporateUser = user.corporate;
const MedicationStatement = require('./backend/db/models/FHiR/MedicationStatement');
const Observation = require('./backend/db/models/FHiR/Observation');
const FamilyMemberHistory = require('./backend/db/models/FHiR/FamilyMemberHistory');
const Condition = require('./backend/db/models/FHiR/Condition');
mongoose.connect("mongodb://localhost:27017", {useMongoClient: true});
const db = mongoose.connection;
console.log("Done loading");

const profileSchema = new mongoose.Schema({
    name: {type: mongoose.Schema.Types.String, required: true},
    type: {type: mongoose.Schema.Types.String, enum: ["apache", "mongo"], required: true},
    times: [{type: mongoose.Schema.Types.Number, required: true}],
});
const Profile = mongoose.model('ProfilingResults', profileSchema);

function parseHrtimeToNanoseconds(hrtime) {
    let nanoSeconds = ((hrtime[0] * 1e9) + (hrtime[1]));
    return nanoSeconds;
}

function timeFunction(f, name, type) {
    let hrStart = process.hrtime();
    f(() => {
        let hrEnd = process.hrtime();

        let startNs = parseHrtimeToNanoseconds(hrStart);
        let endNs = parseHrtimeToNanoseconds(hrEnd);

        Profile.findOne({name: name, type: type}, (err, profile) => {
            if (err) {
                console.log("Error occurred while saving, however the results of the query were " + (endNs - startNs));
            }
            if (profile) {
                profile.times.push((endNs - startNs));
                profile.save((err, savedProfile) => {
                    console.log(JSON.stringify(savedProfile));
                });
            } else {
                let profile = new Profile();
                profile.name = name;
                profile.type = type;
                profile.times = [endNs - startNs];

                profile.save((err, savedProfile) => {
                    console.log(JSON.stringify(savedProfile));
                });
            }
        });
    });
}

function selectNFromDbUsing(db, n, type, callback) {
    if (type === 'mongo') {
        let connector;
        switch (db) {
            case 'observations':
                connector = Observation;
            default:
                console.log(JSON.stringify("Unknown db given " + db));
                throw new Error();
        }
        connector.find().limit(n).exec((err, result) => {
            if (err)
                throw new Error();
            else {
                callback();
                console.log(JSON.stringify(result));
            }
        });

    } else {
        request({
            url: 'http://localhost:8047/query.json',
            method: "POST",
            json: true,
            body: {
                queryType: 'SQL',
                query: 'SELECT * FROM mongo.admin.' + db + ' LIMIT ' + n
            }
        }, (err, response, body) => {
            callback();
            console.log(JSON.stringify(body));
        });
    }

}

for (let i = 0; i < 100; i++) {
    setTimeout(() => {
        timeFunction((cb) => {
            selectNFromDbUsing('observations', 20, 'apache', cb);
        }, 'observation_select_20', 'apache');
    }, i * 1000);

}

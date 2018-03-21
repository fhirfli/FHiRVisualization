let userDb = require('../../db/models/user');
let data = require('../../db/models/data');
let goals = require('../../db/models/goal');
let snowmedCodes = require('../../db/models/FHiR/SnowmedCodes');
let Company = require('../../db/models/company');
let CompanyAssociation = require('../../db/models/companyAssociations');
let Goal = goals.Goal;
let IndividualUser = userDb.individual;
let CorporateUser = userDb.corporate;
let MedicationStatement = require('../../db/models/FHiR/MedicationStatement');
let Observation = require('../../db/models/FHiR/Observation');
let FamilyMemberHistory = require('../../db/models/FHiR/FamilyMemberHistory');
let Condition = require('../../db/models/FHiR/Condition');

// Utility function to convert the system supported dateRange enum to a JS date
function getDateCriteria(dateRange) {
    switch (dateRange) {
        case "Daily":
            return new Date(Date.now() - 24 * 60 * 60 * 1000);
            break;
        case "Weekly":
            return new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            break;
        case "Monthly":
            return new Date(Date.now() - 4 * 7 * 24 * 60 * 60 * 1000);
            break;
        case "Annual":
            return new Date(Date.now() - 12 * 4 * 7 * 24 * 60 * 60 * 1000);
            break;
    }
}


// Utility function to load data for a user
function loadObservationDataFor(spec, dateRange, user, callback) {
    // If only a single data type is being requested, no joins are necassary
    if (dateRange === "Single") {
        Observation.findOne({
            'code.coding.snowmedCT': spec.loinc,
            'subject': user._id
        }, null, {sort: {issued: -1}}, (err, result) => {
            if (err) console.log("ERROR: " + JSON.stringify(err));

            callback(result || {});
        });
    } else {
        // if multiple data types are being requested, the data range is important
        let dateCriteria = getDateCriteria(dateRange);

        Observation.find({
            'code.coding.snowmedCT': spec.loinc,
            'subject': user._id,
            "issued": {$gt: dateCriteria}
        }, null, {sort: {issued: -1}}, (err, result) => {
            if (err) console.log("ERROR: " + JSON.stringify(err));

            callback(result || []);
        });
    }
}

// This module returns an object with utliity functions
module.exports = {
    loadDataFor: function (spec, dataRange, user, callback) {
        switch (spec.profile) {
            case "Observation":
                loadObservationDataFor(spec, dataRange, user, callback);
                break;
            // Add more switch cases here to support querying data for more types of profiles
        }
    }
};

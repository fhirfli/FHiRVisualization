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


function loadObservationDataFor(spec, dateRange, user, callback) {
    if (dateRange === "Single") {
        Observation.findOne({
            'code.coding.snowmedCT': spec.loinc,
            'subject': user._id
        }, null, {sort: {issued: -1}}, (err, result) => {
            if (err) console.log("ERROR: " + JSON.stringify(err));
            console.log("RESULT IS " + JSON.stringify(result));
            callback(result || {});
        });
    } else {
        let dateCriteria = getDateCriteria(dateRange);
        console.log(dateCriteria);
        Observation.find({
            'code.coding.snowmedCT': spec.loinc,
            'subject': user._id,
            "issued": {$gt: dateCriteria}
        }, null, {sort: {issued: -1}}, (err, result) => {
            if (err) console.log("ERROR: " + JSON.stringify(err));
            console.log("RESULT IS " + JSON.stringify(result));
            callback(result || []);
        });

    }

}
module.exports = {

    loadDataFor: function (spec, dataRange, user, callback) {

        switch (spec.profile) {
            case "Observation":
                loadObservationDataFor(spec, dataRange, user, callback);
                break;

        }

    }
};

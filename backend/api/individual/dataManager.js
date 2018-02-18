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

function loadObservationDataFor(spec, user, callback) {
    Observation.find({'code.coding.snowmedCT': spec.loinc, 'subject': user._id}, (err, result) => {
        if (err) console.log("ERROR: " + JSON.stringify(err));
        console.log("RESULT IS " + JSON.stringify(result));
        callback(result || []);
    });

}
module.exports = {

    loadDataFor: function (spec, user, callback) {

        switch (spec.profile) {
            case "Observation":
                loadObservationDataFor(spec, user, callback);
                break;

        }

    }
};

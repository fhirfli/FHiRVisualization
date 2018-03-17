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
const request = require('request');

// request({
//     url: 'http://localhost:8047/query.json',
//     method: "POST",
//     json: true,
//     body: {
//         queryType: 'SQL',
//         query: 'SELECT * FROM mongo.admin.' + db + ' LIMIT ' + n
//     }
// }, (err, response, body) => {
//     callback();
//     console.log(JSON.stringify(body));
// });
//

function generateSingleTypeQueryCodeFor(email, loinc) {
    return "SELECT " +
        "SUM(CAST(`value` AS DOUBLE))/COUNT(*) AS `value` " +
        "FROM " +
        "mongo.admin.`observations` AS observations " +
        "WHERE " +
        "observations.performer = (SELECT company FROM mongo.admin.`corporateusers` WHERE email = '" + email + "' LIMIT 1) " +
        "AND " +
        "`observations`.`code`.`coding`.`snowmedCT` = '" + loinc + "' " +
        "GROUP BY `observations`.`subject` " +
        "LIMIT 20";

}

function generateMultiTypeQueryCodeFor(email, loincA, loincB) {
    return "SELECT `resultA`.`data` AS valueA, `resultB`.`data` AS valueB FROM " +
        "(SELECT `dataB`.`sumB` AS data, `users`.`email` AS email " +
        "FROM (SELECT " +
        "AVG(CAST(`value` AS DOUBLE)) AS sumB, `observations`.`subject` AS subjectB " +
        "FROM " +
        "mongo.admin.`observations` AS observations " +
        "WHERE " +
        "observations.performer = (SELECT company FROM mongo.admin.`corporateusers` WHERE email = '" + email + "' LIMIT 1) " +
        "AND " +
        "ILIKE(`observations`.`code`.`coding`.`snowmedCT`, '" + loincA + "') " +
        "GROUP BY `observations`.`subject`) AS dataB " +
        "INNER JOIN " +
        "( " +
        "SELECT * FROM mongo.admin.`individualusers` " +
        ") AS users " +
        "ON dataB.subjectB = users._id) AS resultA " +
        "INNER JOIN " +
        "(SELECT `dataB`.`sumB` AS data, `users`.`email` AS email " +
        "FROM (SELECT " +
        "AVG(CAST(`value` AS DOUBLE)) AS sumB, `observations`.`subject` AS subjectB " +
        "FROM " +
        "mongo.admin.`observations` AS observations " +
        "WHERE " +
        "observations.performer = (SELECT company FROM mongo.admin.`corporateusers` WHERE email = '" + email + "' LIMIT 1) " +
        "AND " +
        "ILIKE(`observations`.`code`.`coding`.`snowmedCT`, '" + loincB + "') " +
        "GROUP BY `observations`.`subject`) AS dataB " +
        "INNER JOIN " +
        "( " +
        "SELECT * FROM mongo.admin.`individualusers` " +
        ") AS users " +
        "ON dataB.subjectB = users._id) AS resultB " +
        "ON resultA.email= resultB.email ";
}
module.exports = function (env) {
    return {
        loadDataFor: function (spec, user, callback) {
            request({
                url: 'http://localhost:8047/query.json',
                method: "POST",
                json: true,
		timeout: 130000,
                body: {
                    queryType: 'SQL',
                    query: generateSingleTypeQueryCodeFor(user.email, spec.loinc)
                }
            }, (err, response, body) => {
		if(!err) 
			callback(body.rows);
		else {
			console.log("ERROR: In Apache Drill Query " + JSON.stringify(err));
			callback([]);
		}
            });


        },
        loadMultiDataFor: function (spec, secondarySpec, user, callback) {
            request({
                url: 'http://localhost:8047/query.json',
                method: "POST",
                json: true,
		timeout: 130000,
                body: {
                    queryType: 'SQL',
                    query: generateMultiTypeQueryCodeFor(user.email, spec.loinc, secondarySpec.loinc)
                }
            }, (err, response, body) => {
                console.log("\n\n-------------------------------------------------------------------\n" + 
					"On Multi Request: " + user.email +  ", " + JSON.stringify(spec) + ", " + JSON.stringify(secondarySpec) +  "\n" + 
					JSON.stringify(body) + "\n\n");
 
	       console.log("QUERY: " + generateMultiTypeQueryCodeFor(user.email, spec.loinc, secondarySpec.loinc)  + "\n");

                console.log(JSON.stringify(body));
		if(!err) 
			callback(body.rows);
		else {
			console.log("ERROR: In Apache Drill Query " + JSON.stringify(err));
			callback([]);
		}

            });

        }
    };
};

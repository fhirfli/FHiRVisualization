const mongoose = require('mongoose');
mongoose.Promise = Promise;
let names = ["Dhen", "Alex", "Joe", "Bob", "Kiran", "Randi", "Jamey", "Antione", "Tanya", "Dorathy", "Nelia", "Maribel", "Lila", "Emory", "Marjorie", "Regenia", "Meghann", "Jannie", "Pearl", "Jinny", "Un", "Elna", "Iola", "Kamilah", "Joel", "Corine", "Nelson", "Theressa", "Estrella", "Kathryn", "Elden", "Garland", "Duane", "German", "Love", "Carmella", "Myrna", "Alex", "Darcy", "Stefani", "Onita", "Starr", "Giovanni", "Magda", "Beryl", "Terresa", "Rikki", "Helaine", "Essie", "Trinidad", "Izola", "Toni", "Regine", "Ali", "Cyril"];


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

const randomDocument = (page) => (callback) => {
    page.count().exec(function (err, count) {
        // Get a random entry
        let random = Math.floor(Math.random() * count);

        // Again query all users but only fetch one offset by our random #
        page.findOne().skip(random).exec(callback);
    });
};

const randomUser = randomDocument(IndividualUser);
const randomCompany = randomDocument(Company);//(callback) => Company.findOne({}, callback);

function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function randomDate() {
    let start = new Date('1995-12-17T03:24:00');
    let end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomString() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 15; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function generateDataForCorporateUser(id) {
    CorporateUser.findById("5a4d43866e5ba73fa060646f", (err, user) => {
        console.log(JSON.stringify(user));

        let individualUser = new IndividualUser();
        let name = randomFrom(names);
        individualUser.email = name + Math.floor(Math.random()) + "@mail.com";
        individualUser.password = "password";
        individualUser.name = name + " Blogs";

        console.log("Created user now saving");
        individualUser.save((err, savedUser) => {
            if (err) console.log(JSON.stringify(err));
            console.log(JSON.stringify(savedUser));

            let association = new CompanyAssociation();
            association.company = user.company;
            association.user = savedUser._id;
            let company_id = user.company;
            let user_id = savedUser._id;

            association.save((err, savedAssoc) => {
                if (err) console.log(JSON.stringify(err));
                console.log(JSON.stringify(savedAssoc));

                for (let i = 0; i < 100; i++) {
                    let observation = new Observation();

                    observation.status = "registered";
                    observation.code = [{
                        coding: [{
                            snowmedCT: randomFrom(snowmedCodes.snowmedCTCodes)
                        }]
                    }];
                    observation.subject = user_id;
                    observation.effective = randomDate();
                    observation.issued = randomDate();
                    observation.performer = company_id;
                    observation.value = Math.random();
                    observation.device = randomFrom(["android/fs0d0sj2", "fitbit/f0sjds", "iphone/jsd0sdj3", "mac/03kdj02j3"]);

                    observation.save((err, savedObservation) => {
                        if (err) console.log(JSON.stringify(err));
                        console.log(JSON.stringify(savedObservation));
                    });

                }

            })
        })
    });

}

function generateCondtion() {
    randomUser((err, user) => {
        randomCompany((err, company) => {
            let condition = new Condition();

            condition.status = "registered";
            condition.code = {
                coding: {
                    snowmedCT: randomFrom(snowmedCodes.snowmedCTCodes)
                }
            };
            condition.subject = user._id;
            condition.assertedDate = randomDate();
            condition.asserter = company._id;

            condition.save((err, savedCondition) => {
                if (err)
                    console.log(JSON.stringify(err));
                console.log(JSON.stringify(savedCondition));
            })

        });
    });
}

function generateFamilyMemberHistory() {
    randomCompany((err, company) => {
        randomUser((err, user) => {
            let familyMemberHistory = new FamilyMemberHistory();

            familyMemberHistory.status = "registered";
            familyMemberHistory.patient = user._id;
            familyMemberHistory.date = randomDate();
            familyMemberHistory.relationship = {
                coding: {
                    snowmedCT: randomFrom(snowmedCodes.snowmedRelationshipCodes)
                }
            };
            familyMemberHistory.gender = "Male";
            let age = Math.abs(Math.random() * 100);
            familyMemberHistory.age = age;
            familyMemberHistory.estimatedAge = age + Math.random() * 10;
            familyMemberHistory.deceased = "false";
            familyMemberHistory.condition = {
                coding: {
                    snowmedCT: randomFrom(snowmedCodes.snowmedConditionCodes)
                },
            };
            familyMemberHistory.recorder = company._id;
            familyMemberHistory.save((err, savedUser) => {
                if (err) console.log(JSON.stringify(err));
                console.log(JSON.stringify(savedUser));
            });
        });
    });

}


function generateIndividual() {
    randomCompany((err, company) => {
        if (err) console.log(JSON.stringify(err));

        let individualUser = new IndividualUser();
        let name = randomFrom(names);
        individualUser.email = name + Math.floor(Math.random()) + "@mail.com";
        individualUser.password = "password";
        individualUser.name = name + " Blogs";

        console.log("Created user now saving");
        individualUser.save((err, savedUser) => {
            if (err) console.log(JSON.stringify(err));
            console.log(JSON.stringify(savedUser));
        })
    });
}


function generateObservation() {
    randomCompany((err, company) => {
        randomUser((err, user) => {
            let observation = new Observation();

            observation.status = "registered";
            observation.category = {
                coding: {
                    snowmedCT: randomFrom(snowmedCodes.snowmedCategoryCodes)
                }
            };
            observation.code = {
                coding: {
                    snowmedCT: randomFrom(snowmedCodes.snowmedCTCodes)
                }
            };
            observation.subject = user._id;
            observation.effective = randomDate();
            observation.issued = randomDate();
            observation.performer = company._id;
            observation.value = Math.random();
            observation.bodySite = {
                coding: {
                    snowmedCT: randomFrom(snowmedCodes.snowmedBodySiteCodes)
                }
            };
            observation.method = {
                coding: {
                    snowmedCT: randomFrom(snowmedCodes.snowmedMethodCodes)
                },
            };
            observation.device = randomFrom(["android/fs0d0sj2", "fitbit/f0sjds", "iphone/jsd0sdj3", "mac/03kdj02j3"]);

            observation.save((err, savedObservation) => {
                if (err) console.log(JSON.stringify(err));
                console.log(JSON.stringify(savedObservation));
            });

        });
    });
}

function generateMedicationStatement() {
    randomCompany((err, company) => {
        if (err) console.log(JSON.stringify(err));
        console.log(JSON.stringify(company));


        randomUser((err, user) => {
            if (err) console.log(JSON.stringify(err));
            console.log(JSON.stringify(user));


            let medicationStatement = new MedicationStatement();
            medicationStatement.status = "registered";
            medicationStatement.category = {snowmedCT: snowmedCodes.snowmedCategoryCodes[0]};
            medicationStatement.medication = "medication/" + randomString();
            medicationStatement.effective = randomDate();
            medicationStatement.dateAsserted = randomDate();
            medicationStatement.informationSource = company._id;
            medicationStatement.subject = user._id;
            medicationStatement.taken = "y";

            medicationStatement.save((err, savedMedicationStatement) => {
                if (err) console.log(JSON.stringify(err));
                console.log(JSON.stringify(savedMedicationStatement));
            });

        });
    });
}

function generateGenericObservation() {
    let observation = new Observation();

    observation.status = "registered";
    observation.category = {
        coding: {
            // doesn't matter what this is - just to look realistic
            snowmedCT: randomFrom(snowmedCodes.snowmedCategoryCodes)
        }
    };
    observation.bodySite = {
        coding: {
            snowmedCT: randomFrom(snowmedCodes.snowmedBodySiteCodes)
        }
    };
    observation.method = {
        coding: {
            snowmedCT: randomFrom(snowmedCodes.snowmedMethodCodes)
        },
    };
    observation.device = randomFrom(["android/fs0d0sj2", "fitbit/f0sjds", "iphone/jsd0sdj3", "mac/03kdj02j3"]);
    return observation;
}


for (let i = 0; i < 50; i++) {
    // generateIndividual();
    // generateMedicationStatement();
    // generateObservation();
    // generateFamilyMemberHistory();
    // generateCondtion();
    generateObservationFor('kiran@mail.com', 'HeartRate');
}


// DHEN HERE IS THE FUNCTION
// DHEN DHEN DHEN DHEN  ------------------------------------- LOOK HERE HERE HERE HERE
function generateObservationFor(email, dataType) {
    IndividualUser.findOne({email: email}, (err, user) => {
        CompanyAssociation.findOne({user: user._id}, (err, companyAssociations) => {
            let companyId = companyAssociations.company[0];


            let observation = generateGenericObservation();

            observation.subject = user._id;
            observation.performer = companyId;

            observation.code = {
                coding: {
                    snowmedCT: data.DATA_SPECIFICATION[dataType].loinc /// LOOOOK DHEN LOOOK HERE LOOOK HERE LOOK HERE!!!!!!
                    // DATA_SPECIFICATION contains a mapping from dataTypes as follows
                    /*
                     "HeartRate": {
                     name: "Heart Rate",
                     profile: "Observation",
                     loinc: "8867-4",
                     validVisualizations: [
                     "DoughnutDaily"
                     ]
                     },

                     */
                }
            };

            observation.effective = randomDate();
            observation.issued = randomDate();
            observation.value = Math.random();

            observation.save((err, savedObservation) => {
                if (err) console.log(JSON.stringify(err));
                console.log(JSON.stringify(savedObservation));
            });

        });

    });
}

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

function generateDataForCorporateUser(dataType, dateRange) {
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
                    observation.code = {
                        coding: {
                            snowmedCT: data.DATA_SPECIFICATION[dataType].loinc
                        }
                    };
                    observation.subject = user_id;
                    observation.issued = generateDateInDateRange(dateRange);
                    observation.effective = generateDateInDateRange(dateRange);
                    observation.value = generateRealisticDataFor(dataType);

                    observation.performer = company_id;
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


function generateDataForExistingCorporateUser(email, dataType, dateRange) {
    CorporateUser.findOne({email: email}, (err, user) => {
        console.log(JSON.stringify(user));
        CompanyAssociation.find({company: user.company}, (err, associations) => {
            if (err) console.log(JSON.stringify(err));

            let pos = Math.floor(Math.random() * associations.length);

            let association = associations[pos];
            for (let i = 0; i < 100; i++) {
                let observation = new Observation();

                observation.status = "registered";
                observation.code = {
                    coding: {
                        snowmedCT: data.DATA_SPECIFICATION[dataType].loinc
                    }
                };
                observation.subject = association.user;
                observation.performer = user.company;

                observation.issued = generateDateInDateRange(dateRange);
                observation.effective = generateDateInDateRange(dateRange);
                observation.value = generateRealisticDataFor(dataType);

                observation.device = randomFrom(["android/fs0d0sj2", "fitbit/f0sjds", "iphone/jsd0sdj3", "mac/03kdj02j3"]);

                observation.save((err, savedObservation) => {
                    if (err) console.log(JSON.stringify(err));
                    console.log(JSON.stringify(savedObservation));
                });

            }

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
//                    snowmedCT: randomFrom(snowmedCodes.snowmedRelationshipCodes)
                    snowmedCT: randomFrom(['63863-5', '29463-7', '63863-5', '29463-7', '63863-5', '29463-7'])
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


function generateDateInDateRange(dateRange) {
    let noOfDays;
    switch (dateRange) {
        case 'Daily':
            noOfDays = 1;
            break;
        case 'Weekly':
            noOfDays = 7;
            break;
        case 'Monthly':
            noOfDays = 31;
            break;
        case 'Annual':
            noOfDays = 365;
            break;
    }
    let from_ts = new Date(Date.now() - 24 * 60 * 60 * 1000 * noOfDays).getTime();
    let to_ts = new Date().getTime();
    let fDate = new Date(Math.floor(Math.random() * (to_ts - from_ts)) + from_ts);
    return fDate;

}

// generate an observation for a person
function generateObservationFor(email, dataType, dateRange) {
    // finds an individual user by email - this is the user you are using for testing
    IndividualUser.findOne({email: email}, (err, user) => {
        // find the associated company - your user should have an associated company or else it will fail
        CompanyAssociation.findOne({user: user._id}, (err, companyAssociations) => {
            // just grab the id of your associated company
            let companyId = companyAssociations.company[0];


            // create an observation with like the default FHiR fields filled in
            // all you need to set are the
            //          - the subject,
            //          - the performer,
            //          - the code,
            //          - the issued date,
            //          - the effective date,
            //          - the value
            let observation = generateGenericObservation();

            // set the subject to be your individual user (the one specified by email)
            observation.subject = user._id;
            // set the performer to be the associated company
            observation.performer = companyId;

            // sets the code for the observation so that it turns up correctly in the backend
            observation.code = {coding: {snowmedCT: data.DATA_SPECIFICATION[dataType].loinc}};
            // note: data specification is a mapping from dataType (i.e HeartRate) to loinc codes

            // issued is the date that is used in filtering
            // you should make this a date in the specified range
            observation.issued = generateDateInDateRange(dateRange);
            // another date value, isn't really used at all, but set it to make the data more realistic
            observation.effective = generateDateInDateRange(dateRange);
            // the value of the data, actually used in visualizations - you should generate this value
            observation.value = generateRealisticDataFor(dataType);

            // save the created observation to the database
            observation.save((err, savedObservation) => {
                if (err) console.log(JSON.stringify(err));
                console.log(JSON.stringify(savedObservation));
            });

        });

    });
}


function generateRealisticDataFor(dataType) {
    switch (dataType) {
        case 'HeartRate':
            return (Math.random() * 4.27) + 127;
        case 'BodyWeight':
            return (Math.random() * 12.1) + 76.7;
        case 'BodyHeight':
            return (Math.random() * 6.8) + 197.4;
        case 'BMI':
            return (Math.random() * 4.9) + 21.7;
        case 'BloodPressure':
            return (Math.random() * 0.3) + 1.5;
    }
}

// this is a loop that runs 50 times
for (let i = 0; i < 20; i++) {
    let prefix = 'dhen';
    // // here it generates an observation for my user, for a heartrate data point within the past week
    generateObservationFor(prefix + '@mail.com', 'BodyHeight', 'Weekly');
    generateObservationFor(prefix + '@mail.com', 'BodyWeight', 'Weekly');
    generateObservationFor(prefix + '@mail.com', 'BMI', 'Weekly');
    generateObservationFor(prefix + '@mail.com', 'HeartRate', 'Weekly');
    generateObservationFor(prefix + '@mail.com', 'BloodPressure', 'Weekly');
    generateObservationFor(prefix + '@mail.com', 'BodyHeight', 'Daily');
    generateObservationFor(prefix + '@mail.com', 'BodyWeight', 'Daily');
    generateObservationFor(prefix + '@mail.com', 'BMI', 'Daily');
    generateObservationFor(prefix + '@mail.com', 'HeartRate', 'Daily');
    generateObservationFor(prefix + '@mail.com', 'BloodPressure', 'Daily');
    generateObservationFor(prefix + '@mail.com', 'BodyHeight', 'Annual');
    generateObservationFor(prefix + '@mail.com', 'BodyWeight', 'Annual');
    generateObservationFor(prefix + '@mail.com', 'BMI', 'Annual');
    generateObservationFor(prefix + '@mail.com', 'HeartRate', 'Annual');
    generateObservationFor(prefix + '@mail.com', 'BloodPressure', 'Annual');
    generateObservationFor(prefix + '@mail.com', 'BodyHeight', 'Monthly');
    generateObservationFor(prefix + '@mail.com', 'BodyWeight', 'Monthly');
    generateObservationFor(prefix + '@mail.com', 'BMI', 'Monthly');
    generateObservationFor(prefix + '@mail.com', 'HeartRate', 'Monthly');
    generateObservationFor(prefix + '@mail.com', 'BloodPressure', 'Monthly');

}

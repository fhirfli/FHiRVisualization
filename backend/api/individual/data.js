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

const snowmedCodes = require('../../db/models/FHiR/SnowmedCodes');

module.exports = (env, router) => {
    const sanitizeError = require('../../sanitizeError');
    const IndividualVisualizationPreferences = require('../../db/models/visualizationPreferences').individual;
    const Data = require('../../db/models/data');
    const IndividualDataManager = require('./dataManager');

    router.post('/data', (req, res) => {
        const {dataType, dataRange} = req.body;

        if (!dataType || !dataRange) {
            return res.status(400).json({error: 'INCOMPLETE_PARAMETERS'});
        }

        if (!Data.VALID_DATA_TYPES.includes(dataType)) {
            return res.status(400).json({error: 'INVALID_DATATYPE'});
        }
        if (!Data.VALID_DATA_RANGES.includes(dataRange)) {
            return res.status(400).json({error: 'INVALID_DATARANGE'});
        }


        let result = [];

        IndividualDataManager.loadDataFor(Data.DATA_SPECIFICATION[dataType], dataRange, req.user, (result) => {
            return res.json(result);
        });
        //     // TODO: Actually load user data here
        //     let lim = Math.random() * 100;
        //     for (let i = 0; i < lim; i++) {
        //         let observation = {};
        //
        //         observation.status = "registered";
        //         observation.category = {
        //             coding: {
        //                 snowmedCT: randomFrom(snowmedCodes.snowmedCategoryCodes)
        //             }
        //         };
        //         observation.code = {
        //             coding: {
        //                 snowmedCT: randomFrom(snowmedCodes.snowmedCTCodes)
        //             }
        //         };
        //         observation.subject = req.user._id;
        //         observation.effective = randomDate();
        //         observation.issued = randomDate();
        //         observation.performer = '';
        //         observation.value = Math.random();
        //         observation.bodySite = {
        //             coding: {
        //                 snowmedCT: randomFrom(snowmedCodes.snowmedBodySiteCodes)
        //             }
        //         };
        //         observation.method = {
        //             coding: {
        //                 snowmedCT: randomFrom(snowmedCodes.snowmedMethodCodes)
        //             },
        //         };
        //         observation.device = randomFrom(["android/fs0d0sj2", "fitbit/f0sjds", "iphone/jsd0sdj3", "mac/03kdj02j3"]);
        //         result.push(observation);
        //     }
        //
        //     return res.json(result);
        //
    });


};

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
    const CorporateDataManager = require('./dataManager')(env);

    router.post('/data', (req, res) => {
        const {mainDataType} = req.body;

        if (!mainDataType) {
            return res.status(400).json({error: 'INCOMPLETE_PARAMETERS'});
        }

        if (!Data.VALID_DATA_TYPES.includes(mainDataType)) {
            return res.status(400).json({error: 'INVALID_DATATYPE'});
        }


        if (req.body.secondaryDataType) {
            let secondaryDataType = req.body.secondaryDataType;
            if (true) {
                CorporateDataManager.loadMultiDataFor(Data.DATA_SPECIFICATION[mainDataType], Data.DATA_SPECIFICATION[secondaryDataType], req.user, (result) => {
                    return res.json(result);
                });
            } else {
                let x = Math.random() * 100;
                let result = [];
                for (var i = 0; i < x; i++) {
                    result.push({valueA: (Math.random() * 140), valueB: (Math.random() * 300)})
                }
                res.json(result)
            }

        } else {
            if (true) {

                CorporateDataManager.loadDataFor(Data.DATA_SPECIFICATION[mainDataType], req.user, (result) => {
                    return res.json(result);
                });
            } else {
                let x = Math.random() * 100;
                let result = [];
                for (var i = 0; i < x; i++) {
                    result.push({value: (Math.random() * 140)})
                }
                res.json(result)
            }
        }
    });


};

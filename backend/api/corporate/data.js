// Utility function to retrieve a random value from an array
function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Utility function to return a random data
function randomDate() {
    let start = new Date('1995-12-17T03:24:00');
    let end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Utility function to return a random string
function randomString() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 15; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

const snowmedCodes = require('../../db/models/FHiR/SnowmedCodes');

// The following boolean informs the system whether to use apache drill sourced data, or random data
// useful for developing the frontend without having drill running as well.
let production = true;

module.exports = (env, router) => {
    const sanitizeError = require('../../sanitizeError');
    const IndividualVisualizationPreferences = require('../../db/models/visualizationPreferences').individual;
    const Data = require('../../db/models/data');
    const CorporateDataManager = require('./dataManager')(env);

    // POST Requests to the data endpoint return aggregate data for the user's company
    router.post('/data', (req, res) => {
        const {mainDataType} = req.body;

        // Check request parameters
        if (!mainDataType) {
            return res.status(400).json({error: 'INCOMPLETE_PARAMETERS'});
        }
        if (!Data.VALID_DATA_TYPES.includes(mainDataType)) {
            return res.status(400).json({error: 'INVALID_DATATYPE'});
        }


        // Depending on whether multiple data types are requested, the logic changes
        if (req.body.secondaryDataType) {
            let secondaryDataType = req.body.secondaryDataType;

            if (production) {
                // Use the data manager to handle loading all required data for the user
                CorporateDataManager.loadMultiDataFor(Data.DATA_SPECIFICATION[mainDataType], Data.DATA_SPECIFICATION[secondaryDataType], req.user, (result) => {
                    // Return the data
                    return res.json(result);
                });
            } else {
                // If not in production, allow developers to test their visualizations against a data set of up to 100
                // data points
                let x = Math.random() * 100;
                let result = [];
                for (let i = 0; i < x; i++) {
                    result.push({valueA: (Math.random() * 140), valueB: (Math.random() * 300)})
                }
                // Return the data
                res.json(result)
            }

        } else {
            if (production) {
                // Use the data manager to handle loading all required data for the user
                CorporateDataManager.loadDataFor(Data.DATA_SPECIFICATION[mainDataType], req.user, (result) => {
                    // Return the data
                    return res.json(result);
                });
            } else {

                // If not in production, allow developers to test their visualizations against a data set of up to 100
                // data points
                let x = Math.random() * 100;
                let result = [];
                for (let i = 0; i < x; i++) {
                    result.push({value: (Math.random() * 140)})
                }
                // Return the data
                res.json(result)
            }
        }
    });
};

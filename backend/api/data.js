// References:
// Map Equivalent for Objects
// Reference: https://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays
// Line: 16

// main endpoint for retrieving specifications for the data supported by the backend
module.exports = (env) => {
    const express = require('express');
    const router = express.Router();
    const Data = require('../db/models/data');


    // returns the visualizations and the data profiles used by the system
    router.get('/types/all', (req,res) => {
        let result = Object.keys(Data.DATA_SPECIFICATION).map((key) => {
            // returns an object containing the data type, a human readable name, and data profile for each point
            return {
                dataType: key,
                name: Data.DATA_SPECIFICATION[key].name,
                profile: Data.DATA_SPECIFICATION[key].profile
            };
        });
        res.status(200).json(result);
    });


    // returns the valid visualizations for each data type supported by the system
    router.get('/types/:dataType/visualizations', (req,res) => {
        // retrieve data from input
        const dataType = req.params.dataType;

        // check correct parameters given
        if(!dataType) {
            res.status(400).json({error: 'NO_DATA_TYPE_PROVIDED'});
        }
        if(!(dataType in Data.DATA_SPECIFICATION)) {
            res.status(404).json({error: 'RESOURCE_NOT_FOUND'});
        }

        // return the valid visualizations for the requested data type
        let result = Data.DATA_SPECIFICATION[dataType].validVisualizations;
        res.status(200).json(result);
    });




    return router;
};

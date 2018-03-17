// Endpoint for communicating visualization configurations to the frontend
module.exports = (env) => {
    const express = require('express');
    const router = express.Router();
    const Data = require('../db/models/data');

    // Colours endpoint returns all colours supported by the system
    router.get('/colours', (req, res) => {
        return res.status(200).json(Data.COLORS);
    });


    // Specification endpoint returns a mapping of visualization types to boolean values, indicating whether
    // the visualization requires multiple data types (i.e a line graph of x against y)
    router.get('/aggregate/specification', (req, res) => {
        return res.status(200).json(Data.AGGREGATE_VISUALIZATIONS_SECONDARY_NEEDED);
    });


    // Returns the valid visualizations for a specified data type (specifically, for corporate users)
    router.get('/:visualizations/type', (req, res) => {
        const visualization = req.params.visualization;

        // check valid input parameters
        if(!visualization){
          return res.status(400).json({error: 'NO_VISUALIZATION_PROVIDED'});
        }
        if(!(visualization in Data.AGGREGATE_VISUALIZATIONS_SECONDARY_NEEDED)) {
           return res.status(404).json({error: 'RESOURCE_NOT_FOUND'});
        }

        // retrieve and return data
        return res.status(200).json({
            visualization: visualization,
            type: Data.AGGREGATE_VISUALIZATIONS_SECONDARY_NEEDED[visualization] ?
                'MULTI_DATA' : 'SINGLE_DATA'
        });
    });

    return router;
};

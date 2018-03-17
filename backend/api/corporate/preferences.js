// Utility function to sanitize preferences to remove application critical, sensitive data (_ids, timestamps, etc.)
function sanitizePreferences(preferences) {
    return preferences.map((obj) => {
        return {
            mainDataType: obj.mainDataType,
            secondaryDataType: obj.secondaryDataType,
            colour: obj.colour,
            visualization: obj.visualization
        };
    });
}

module.exports = (env, router) => {
    const sanitizeError = require('../../sanitizeError');
    const CorporateVisualizationPreferences = require('../../db/models/visualizationPreferences').corporate;
    const SECONDARY_NEEDED = require('../../db/models/data').AGGREGATE_VISUALIZATIONS_SECONDARY_NEEDED;


    // GET Request to preferences retrieves all preferences for a user
    router.get('/preferences', (req, res) => {
        CorporateVisualizationPreferences.find({user: req.user._id}, (err, preferences) => {
            if (err) {
                return res.status(400).json(sanitizeError(env, err));
            }
            return res.status(200).json(sanitizePreferences(preferences));
        });
    });


    // POST request to preferences updates the preferences document for the indivdiual to include the new preference
    router.post('/preferences', (req, res) => {
        const {mainDataType, colour, visualization} = req.body;

        // Check request parameters
        if (!mainDataType || !colour || !visualization) {
            return res.status(400).json({error: 'INCOMPLETE_PARAMETERS'});
        }
        if (!(visualization in SECONDARY_NEEDED)) {
            return res.status(400).json({error: 'INVALID_VISUALIZATION'});
        }


        // Depending on whether multiple data types are needed, the logic changes
        if (SECONDARY_NEEDED[visualization]) {
            const secondaryDataType = req.body.secondaryDataType;

            // Check the request parameters again, this time ensuring that the secondary data type is provided and valid
            if (!secondaryDataType) {
                return res.status(400).json({error: 'SECONDARY_DATA_NOT_PROVIDED'});
            }
            if (secondaryDataType === mainDataType) {
                return res.status(400).json({error: 'SECONDARY_DATA_EQUALS_PRIMARY'});
            }

            // Check that the new preference to add doesn't conflict with the existing one
            CorporateVisualizationPreferences.findOne({
                user: req.user._id,
                mainDataType: mainDataType,
                secondaryDataType: secondaryDataType,
                visualization: visualization
            }, (err, pref) => {
                if (err)
                    return res.status(400).json(sanitizeError(env, err));

                // return 400 if the preference for the user already exists as otherwise could lead to duplicates
                if (pref) {
                    return res.status(400).json({error: "RESOURCE_ALREADY_EXISTS"});
                }


                // otherwise, construct a new preference document to represent the users' preferences
                pref = new CorporateVisualizationPreferences({
                    'user': req.user._id,
                    'mainDataType': mainDataType,
                    'secondaryDataType': secondaryDataType,
                    'colour': colour,
                    'visualization': visualization
                });

                pref.save((err, savedPref) => {
                    if (err)
                        return res.status(400).json(sanitizeError(env, err));
                    return res.status(200).json({
                        mainDataType: savedPref.mainDataType,
                        secondaryDataType: savedPref.secondaryDataType,
                        colour: savedPref.colour,
                        visualization: savedPref.visualization
                    });
                })
            });
        } else {
            // If the visualization only requires a single data type

            // Check that a document representing the preference doesn't already exist on the system.
            CorporateVisualizationPreferences.findOne({
                user: req.user._id,
                mainDataType: mainDataType,
                visualization: visualization
            }, (err, pref) => {
                if (err) return res.status(400).json(sanitizeError(env, err));

                // return 400 if it already exists (following REST standards)
                if (pref) {
                    return res.status(400).json({error: "RESOURCE_ALREADY_EXISTS"});
                }


                // Otherwise create a new document to represent the user's visualization preference
                pref = new CorporateVisualizationPreferences({
                    'user': req.user._id,
                    'mainDataType': mainDataType,
                    'colour': colour,
                    'visualization': visualization
                });
                pref.save((err, savedPref) => {
                    if (err)
                        return res.status(400).json(sanitizeError(err));
                    return res.status(200).json({
                        mainDataType: savedPref.mainDataType,
                        colour: savedPref.colour,
                        visualization: savedPref.visualization
                    });
                })
            });
        }
    });

    // PUT Requests to preferences updates the colour fields of existing preferences
    router.put('/preferences', (req, res) => {
        const {mainDataType, colour, visualization} = req.body;

        // Check request parameters
        if (!mainDataType || !colour || !visualization) {
            return res.status(400).json({error: 'INCOMPLETE_PARAMETERS'});
        }
        if (!(visualization in SECONDARY_NEEDED)) {
            return res.status(400).json({error: 'INVALID_VISUALIZATION'});
        }


        // Depending on whether multiple data types are needed, the logic changes
        if (SECONDARY_NEEDED[visualization]) {
            const secondaryDataType = req.body.secondaryDataType;

            // Check request parameters, this time ensuring that a valid secondary visualization is provided
            if (!secondaryDataType) {
                return res.status(400).json({error: 'SECONDARY_DATA_NOT_PROVIDED'});
            }
            if (secondaryDataType === mainDataType) {
                return res.status(400).json({error: 'SECONDARY_DATA_EQUALS_PRIMARY'});
            }

            // Find the preference requested by the user in the MongoDB
            CorporateVisualizationPreferences.findOne({
                user: req.user._id,
                mainDataType: mainDataType,
                secondaryDataType: secondaryDataType,
                visualization: visualization
            }, (err, pref) => {
                if (err)
                    return res.status(400).json(sanitizeError(env, err));

                // return 404 if the preference doesn't exist as the user has attempted
                // to update a non-existant preference
                if (!pref) {
                    return res.status(404).json({error: 'RESOURCE_DOES_NOT_EXIST'});
                }

                // update the colour field of the preferences object
                pref.colour = colour;

                pref.save((err, savedPref) => {
                    if (err)
                        return res.json(sanitizeError(err));

                    // return a sanitized version of the user's preferences
                    return res.status(200).json({
                        mainDataType: savedPref.mainDataType,
                        secondaryDataType: savedPref.secondaryDataType,
                        visualization: savedPref.visualization,
                        colour: savedPref.colour
                    });
                });
            });
        } else {
            // If the visualization only requires a single data type

            // Find the preference requested by the user
            CorporateVisualizationPreferences.findOne({
                user: req.user._id,
                mainDataType: mainDataType,
                visualization: visualization
            }, (err, pref) => {
                if (err)
                    return res.status(400).json(sanitizeError(env, err));

                // return 404 if the preference doesn't exist as the user has attempted
                // to update a non existant preference
                if (!pref) {
                    return res.status(404).json({error: 'RESOURCE_DOES_NOT_EXIST'});
                }

                // update the colour field of the preference object
                pref.colour = colour;

                pref.save((err, savedPref) => {
                    if (err)
                        return res.json(sanitizeError(err));

                    // return a sanitized version of the user's preferences
                    return res.json({
                        mainDataType: savedPref.mainDataType,
                        visualization: savedPref.visualization,
                        colour: savedPref.colour
                    });
                });
            });
        }

    });


    // DELETE requests to preferences removes preferences documents from the MongoDB
    router.delete('/preferences', (req, res) => {
        const {mainDataType, visualization} = req.body;

        // Check request parameters
        if (!mainDataType || !visualization) {
            return res.status(400).json({error: 'INCOMPLETE_PARAMETERS'});
        }
        if (!(visualization in SECONDARY_NEEDED)) {
            return res.status(400).json({error: 'INVALID_VISUALIZATION'});
        }


        // Depending on whether multiple data types are needed, the logic changes
        if (SECONDARY_NEEDED[visualization]) {
            const secondaryDataType = req.body.secondaryDataType;

            // Check request parameters, this time ensuring that a valid secondary visualization is provided
            if (!secondaryDataType) {
                return res.status(400).json({error: 'SECONDARY_DATA_NOT_PROVIDED'});
            }
            if (secondaryDataType === mainDataType) {
                return res.status(400).json({error: 'SECONDARY_DATA_EQUALS_PRIMARY'});
            }

            // Find the preference requested by the user
            CorporateVisualizationPreferences.findOneAndRemove({
                user: req.user._id,
                mainDataType: mainDataType,
                secondaryDataType: secondaryDataType,
                visualization: visualization
            }, (err, pref) => {
                if (err)
                    return res.status(400).json({error: sanitizeError(env, err)});

                // return 404 if the preference doesn't exist as the user has attempted
                // to delete a non existant preference
                if (!pref)
                    return res.status(404).json({error: 'RESOURCE_DOES_NOT_EXIST'});

                // return a sanitized version of the user's preferences
                return res.status(200).json({
                    mainDataType: pref.mainDataType,
                    secondaryDataType: secondaryDataType,
                    visualization: pref.visualization,
                    colour: pref.colour
                });
            });

        } else {
            // Use mongoDB's findOneAndRemove function to quickly remove the requested preference
            CorporateVisualizationPreferences.findOneAndRemove({
                user: req.user._id,
                mainDataType: mainDataType,
                visualization: visualization
            }, (err, pref) => {
                if (err)
                    return res.status(400).json({error: sanitizeError(env, err)});

                // return 404 if the preference doesn't exist as the user has attempted
                // to delete a non existant preference
                if (!pref)
                    return res.status(404).json({error: 'RESOURCE_DOES_NOT_EXIST'});

                // return a sanitized version of the user's preferences
                return res.status(200).json({
                    mainDataType: pref.mainDataType,
                    visualization: pref.visualization,
                    colour: pref.colour
                });
            });
        }
    });
};
// References:
// How to remove item from array by value
// Reference: https://stackoverflow.com/questions/3954438/how-to-remove-item-from-array-by-value
// Line:  173

// Utility function to sanitize preferences to remove application critical, sensitive data (_ids, timestamps, etc.)
function sanitizePreferences(preferences) {
    return preferences.map((preference) => {
        return {
            dataType: preference.dataType,
            colour: preference.colour,
            visualization: preference.visualization
        }
    });
}


module.exports = (env, router) => {
    const sanitizeError = require('../../sanitizeError');
    const IndividualVisualizationPreferences = require('../../db/models/visualizationPreferences').individual;
    const Data = require('../../db/models/data');

    // GET Request to preferences retrieves all preferences for a user
    router.get('/preferences', (req, res) => {
        IndividualVisualizationPreferences.find({user: req.user._id}, (err, preferences) => {
            if (err)
                return res.status(400).json(sanitizeError(env, err));

            return res.status(200).json(sanitizePreferences(preferences));
        });
    });


    // POST request to preferences updates the preferences document for the indivdiual to include the new preference
    router.post('/preferences', (req, res) => {
        const {dataType, colour, visualization} = req.body;

        // Check request parameters
        if (!dataType || !visualization) {
            return res.status(400).json({error: 'INCOMPLETE_PARAMETERS'});
        }
        if (!(Data.VALID_DATA_TYPES.includes(dataType))) {
            return res.status(400).json({error: 'INVALID_DATATYPE'});
        }
        if (!(Data.VALID_VISUALIZATIONS.includes(visualization))) {
            return res.status(400).json({error: 'INVALID_VISUALIZATION'});
        }
        if (!(Data.DATA_SPECIFICATION[dataType].validVisualizations.includes(visualization))) {
            return res.status(400).json({error: 'INCOMPATIBLE_VISUALIZATION'});
        }

        // Retrieve the preferences document for the user's visualizations for the requested datatype
        IndividualVisualizationPreferences.findOne({
            user: req.user._id,
            dataType: dataType
        }, (err, pref) => {
            if (err)
                return res.status(400).json(sanitizeError(env, err));

            // if a preference for the data type requested exists
            if (pref) {
                // check that it does not conflict
                if (colour && pref.colour !== colour)
                    return res.status(400).json({error: 'COLOUR_MISMATCH'});
                if (pref.visualization.includes(visualization))
                    return res.status(400).json({error: "VISUALIZATION_EXISTS"});

                // if there are no conflicts, just update the existing document
                pref.visualization.push(visualization);
            } else {
                // if no visualization exists, then the colour field is required in the request
                if (!colour) {
                    return res.status(400).json({error: 'INCOMPLETE_PARAMETERS'});
                }

                // construct a document to represent the preferences
                pref = new IndividualVisualizationPreferences({
                    user: req.user._id,
                    dataType: dataType,
                    colour: colour,
                    visualization: [visualization]
                });
            }

            pref.save((err, savedPref) => {
                if (err)
                    return res.status(400).json(sanitizeError(env, err));
                return res.status(200).json({
                    dataType: savedPref.dataType,
                    colour: savedPref.colour,
                    visualization: savedPref.visualization
                });
            });
        });
    });

    // PUT Requests to preferences updates the colour of the visualization
    router.put('/preferences', (req, res) => {
        const {dataType, colour} = req.body;

        // Check request parameters
        if (!dataType || !colour) {
            return res.status(400).json({error: 'INCOMPLETE_PARAMETERS'});
        }
        if (!(Data.VALID_DATA_TYPES.includes(dataType))) {
            return res.status(400).json({error: 'INVALID_DATATYPE'});
        }

        // Check that preference being updated exists on the system
        IndividualVisualizationPreferences.findOne({
            user: req.user._id,
            dataType: dataType
        }, (err, pref) => {
            if (err)
                return res.status(400).json(sanitizeError(env, err));

            // return 404 if the preference doesn't exist as the user has attempted to update a non-existant preference
            if (!pref) {
                return res.status(404).json({error: 'RESOURCE_NOT_FOUND'});
            }
            // update the colour field of the document stored on the system
            pref.colour = colour;

            pref.save((err, savedPref) => {
                if (err)
                    return res.status(400).json(sanitizeError(env, err));

                // return a sanitized version of the user's preferences
                return res.status(200).json({
                    dataType: savedPref.dataType,
                    colour: savedPref.colour,
                    visualization: savedPref.visualization
                });
            });
        });
    });


    // DELETE requests to preferences removes preferences documents from the MongoDB
    router.delete('/preferences', (req, res) => {
        const {dataType, visualization} = req.body;

        // Check request parameters
        if (!dataType || !visualization) {
            return res.status(400).json({error: 'INCOMPLETE_PARAMETERS'});
        }
        if (!Data.VALID_DATA_TYPES.includes(dataType)) {
            return res.status(400).json({error: 'INVALID_DATATYPE'});
        }
        if (!(Data.VALID_VISUALIZATIONS.includes(visualization))) {
            return res.status(400).json({error: 'INVALID_VISUALIZATION'});
        }

        // Check that the requested preference is available
        IndividualVisualizationPreferences.findOne({
            user: req.user._id,
            dataType: dataType
        }, (err, pref) => {
            if (err)
                return res.status(400).json(sanitizeError(env, err));

            // if the preference requested is not present, return 404
            if (!pref) {
                return res.status(404).json({error: 'RESOURCE_NOT_FOUND'});
            }
            // if the preference document for the datatype, doesn't include the visualization return 404
            if (!pref.visualization.includes(visualization)) {
                return res.status(404).json({error: 'RESOURCE_NOT_FOUND'});
            }

            // remove the requested visualization from the document
            pref.visualization.splice(pref.visualization.indexOf(visualization), 1);

            pref.save((err, savedPref) => {
                if (err)
                    return res.status(400).json(sanitizeError(env, err));
                return res.status(200).json({
                    dataType: savedPref.dataType,
                    colour: savedPref.colour,
                    visualization: savedPref.visualization
                });
            });
        });

    });
};

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const Data = require('./data');
const ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.Promise = Promise;


// A schema used to represent the preferences of individual users
const individualPreferenceSchema = new Schema({
    user: {type: ObjectId, ref: 'IndividualUser', required: true},      // the user to which the preference belongs
    dataType: {
        type: String, enum: Data.VALID_DATA_TYPES,                      // the datatype which should be visualized
        required: true,
    },
    colour: {type: String, enum: Data.COLORS, required: true},          // the colour of the visualization
    visualization: [{type: String, enum: Data.VALID_VISUALIZATIONS}]    // a list of visualizations for the dataType
}, { usePushEach: true });

const corporatePreferenceSchema = new Schema({
    user: {type: ObjectId, ref: 'CorporateUser', required: true},                                   // the user to which the preferences belong
    mainDataType: {type: String, enum: Data.VALID_DATA_TYPES, required: true},                      // the main dataType for the visualization
    secondaryDataType: {type: String, enum: [...Data.VALID_DATA_TYPES, "Time"], required: false},   // the (optional) secondary datatype for the visualization (i.e for xyplots)
    colour: {type: String, enum: Data.COLORS, required: true},                                      // the colour of the visualization
    visualization: {type: String, enum: Data.VALID_AGGREGATE_VISUALIZATIONS, required: true}        // the type of visualization to render the data with
}, { usePushEach: true });


const IndividualVisualizationPreference = mongoose.model('IndividualVisualizationPreference', individualPreferenceSchema);
const CorporateVisualizationPreference = mongoose.model('CorporateVisualizationPreference', corporatePreferenceSchema);

module.exports = {
    individual: IndividualVisualizationPreference,
    corporate: CorporateVisualizationPreference
};

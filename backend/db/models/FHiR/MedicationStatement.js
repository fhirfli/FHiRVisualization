const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const ObjectId = mongoose.Schema.Types.ObjectId;
let snowmed = require('./SnowmedCodes');

// A FHIR Compliant Medication Schema - See Project Documentation Website for information
const medicationStatementSchema = new Schema({
    // identifier is implicitly present
    status: {type: String, enum: ["registered", "preliminary", "final", "amended"], required: true},
    category: {
        type: new Schema({
            coding: {
                type: new Schema({snowmedCT: {type: String, enum: snowmed.snowmedCategoryCodes}}, {_id: false})
            }
        }, {_id: false})
    },

    medication: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    effective: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    dateAsserted: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    informationSource: {type: ObjectId, ref: 'Company', required: true},
    subject: {
        type: ObjectId, ref: 'IndividualUser', required: true
    },

    taken: {type: mongoose.Schema.Types.String, enum: ["y", "n", "unk", "na"], required: true},
    dosage: {type: mongoose.Schema.Types.String},
    requiredInformation: {type: mongoose.Schema.Types.String}
});


const MedicationStatement = mongoose.model('MedicationStatement', medicationStatementSchema);
module.exports = MedicationStatement;

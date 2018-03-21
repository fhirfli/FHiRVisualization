const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const ObjectId = mongoose.Schema.Types.ObjectId;
let snowmed = require('./SnowmedCodes');

// A FHIR Compliant Observation Schema - See Project Documentation Website for information
const observationSchema = new Schema({
    // identifier is implicitly present
    status: {type: String, enum: ["registered", "preliminary", "final", "amended"], required: true},
    category: {
        type: new Schema({
            coding: {
                type: new Schema({snowmedCT: {type: String, enum: snowmed.snowmedCategoryCodes}}, {_id: false})
            }
        }, {_id: false})
    },
    code: {
        type: new Schema({
            coding: {
                type: new Schema({
                    snowmedCT: {
                        type: String,
                        enum: snowmed.snowmedCTCodes,
                        required: true
                    }
                }, {_id: false}),
                required: true
            }
        }, {_id: false})
    },
    subject: {
        type: ObjectId, ref: 'IndividualUser', required: true
    },
    effective: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    issued: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    performer: {
        type: ObjectId,
        ref: 'Company',
        required: true
    },
    value: {
        type: String,
        required: true
    },
    comment: {
        type: String
    },
    bodySite: {
        type: new Schema({
            coding: {
                type: new Schema({snowmedCT: {type: String, enum: snowmed.snowmedBodySiteCodes}}, {_id: false})
            }
        }, {_id: false})
    },
    method: {
        type: new Schema({
            coding: {
                type: new Schema({snowmedCT: {type: String, enum: snowmed.snowmedMethodCodes}}, {_id: false})
            },
            text: {type: String}
        }, {_id: false})
    },
    device: {
        type: String
    }
});


const Observation = mongoose.model('Observation', observationSchema);

module.exports = Observation;

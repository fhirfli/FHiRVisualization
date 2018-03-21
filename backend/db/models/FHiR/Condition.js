const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const ObjectId = mongoose.Schema.Types.ObjectId;
let snowmed = require('./SnowmedCodes');

// A FHIR Compliant Condition Schema - See Project Documentation Website for information
const conditionSchema = new Schema({
    // identifier is implicitly present
    status: {
        type: mongoose.Schema.Types.String,
        enum: ["registered", "preliminary", "final", "amended"],
        required: true
    },
    code: {
        required: true,
        type: new Schema({
            coding: {
                required: true,
                type: new Schema({snowmedCT: {type: String, enum: snowmed.snowmedCTCodes}}, {_id: false})
            }
        }, {_id: false})
    },
    subject: {
        type: ObjectId, ref: 'IndividualUser', required: true
    },
    onset: {
        type: mongoose.Schema.Types.String
    },
    assertedDate: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    asserter: {
        type: ObjectId,
        ref: 'Company',
        required: true
    },
    stage: {
        type: mongoose.Schema.Types.String
    }
});


const Condition = mongoose.model('Condition', conditionSchema);
module.exports = Condition;

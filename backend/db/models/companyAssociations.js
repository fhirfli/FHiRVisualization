const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.Promise = Promise;


// Schema used to represent an indivividual user's associations in the system
const associationSchema = new Schema({
    user: {type: ObjectId, ref: 'IndividualUser', required: true}, // The user's associations
    company: [{type: ObjectId, ref: 'Company'}]                    // a list of associated companies
}, {usePushEach: true});


const CompanyAssociation = mongoose.model('CompanyAssociation', associationSchema);
module.exports = CompanyAssociation;
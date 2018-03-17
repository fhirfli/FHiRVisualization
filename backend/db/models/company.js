const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.Promise = Promise;


// Schema representing each company in the system
const companySchema = new Schema({
    domain: {type: String, required: true}, // Unique domain used to identify the company
    name: {type: String, required: true}    // Human Readable Name presented to users
}, {usePushEach: true});


const Company = mongoose.model('Company', companySchema);
module.exports = Company;
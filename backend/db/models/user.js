const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.Promise = Promise;


// A schema to represent individual users on the system
const individualUserSchema = new Schema({
    email: {type: String, unique: true, required: true},         // the email used to identify the user
    password: {type: String, unique: false, required: true},     // a cryptographic hash of the password used to log in
    name: {                                                        // the name of the user
        type: String,
        required: true
  }
});

// A schema used to represent corporate users of the system
const corporateUserSchema = new Schema({
    email: {type: String, unique: true, required: true},         // the email used to identify the user
    password: {type: String, unique: false, required: true},     // a cryptographic hash of the password used to log in
    company: {type: ObjectId, ref: 'Company', required: true}     // the name of the company to which the user belongs
});


individualUserSchema.methods = {
    checkPassword: function(inputPassword) {
        return bcrypt.compareSync(inputPassword, this.password);
    },
    hashPassword: function(plainTextPassword) {
        return bcrypt.hashSync(plainTextPassword, 10);
    }
};

individualUserSchema.pre('save', function(next) {
    if(!(this.password)){
        next();
    } else {
        this.password = this.hashPassword(this.password);
        next();
    }
});


corporateUserSchema.methods = {
    checkPassword: function(inputPassword) {
        return bcrypt.compareSync(inputPassword, this.password);
    },
    hashPassword: function(plainTextPassword) {
        return bcrypt.hashSync(plainTextPassword, 10);
    }
};

corporateUserSchema.pre('save', function(next) {
    if(!(this.password)){
        next();
    } else {
        this.password = this.hashPassword(this.password);
        next();
    }
});

individualUserSchema.virtual('isCorporate').get(function() { return false;});
corporateUserSchema.virtual('isCorporate').get(function() {return true;});

const IndividualUser = mongoose.model('IndividualUser', individualUserSchema);
const CorporateUser = mongoose.model('CorporateUser', corporateUserSchema);
module.exports = {
    individual: IndividualUser,
    corporate: CorporateUser
};
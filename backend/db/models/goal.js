const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Data   = require('./data');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Number = mongoose.Schema.Types.Number;
mongoose.Promise = Promise;


// A list of all valid goal ranges for the system
const GOAL_PERIODS = ['DAY', 'WEEK', 'FORTNIGHT', 'MONTH'];

// a schema to represent goals for individuals on the system
const goalSchema = new Schema({
    user: {type: ObjectId, ref: 'IndividualUser', required: true},  // the user to which the goal belongs
    dataType: {type: String, enum: Data.VALID_DATA_TYPES},          // the dataType on which the goal relates
    name: {type: String, required: true, unique: true},            // the name of the goal
    value: {type: Number, required: true},                        // the target value for the goal
    period: {type: String, enum: GOAL_PERIODS, required: true},   // the range of values over which the goal applies
    colour: {type: String, enum: Data.COLORS, required: true}     // the colour for visualizations of the goal
}, {usePushEach: true});


const Goal = mongoose.model('Goal', goalSchema);

module.exports = {
    Goal: Goal,
    GOAL_PERIODS: GOAL_PERIODS
};

// This module contains the definition of all the static data configurations of the system
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.Promise = Promise;


// A list of all valid data profiles in the system
const VALID_SCHEMAS = [
    "Observation", "Condition", "FamilyMemberHistory", "MedicationStatement", "Patient", "Organization"
];

// A list of all valid visualizations for individual users
const VALID_VISUALIZATIONS = [
    "BarChartDaily", "BarChartWeekly", "BarChartMonthly",
    "LineGraphWeekly", "LineGraphMonthly", "LineGraphAnnual",
    "DoughnutDaily", "DoughnutWeekly", "ClockDaily"
];


// A mapping of visualizations to a boolean representing
// whether the visualization requires multipledata points
const AGGREGATE_VISUALIZATIONS_SECONDARY_NEEDED = {
    "BarChart": false,
    "LineGraph": true,
    "DoughnutChart": false
};

// A list of all valid visualizations for corporate users
const VALID_AGGREGATE_VISUALIZATIONS = Object.keys(AGGREGATE_VISUALIZATIONS_SECONDARY_NEEDED);
// At run time will be of the form
/*[
 "BarChart", "LineGraph", "DoughnutChart"
 ];*/


// A list of all valid colours supported by the system
const COLORS = ['red', 'blue', 'green', 'yellow', 'indigo', 'navy', 'orange'];

/*
 "29463-7", // weight
 "65968-0", // sleep
 "63863-5", // hours of activity
 "35094-2",// sys blood pressure
 "39156-5"// bmi
 */
// A mapping of datatypes to an object specifying various important specifications for the datatype
// such as a human readable name, a loinc code, a list of visualizations supported by the data type
const DATA_SPECIFICATION = {
    "HeartRate": {
        name: "Heart Rate",
        profile: "Observation",
        loinc: "8867-4",
        validVisualizations: [
            "DoughnutDaily",
            "DoughnutWeekly",
            "BarChartWeekly",
            "BarChartMonthly"
        ]
    },
    "BodyHeight": {
        name: "Body Height",
        profile: "Observation",
        loinc: "8302-2", // height
        validVisualizations: [
            "LineGraphWeekly",
            "BarChartWeekly",
            "LineGraphAnnual"
        ]
    },
    "BodyWeight": {
        name: "Body Weight",
        profile: "Observation",
        loinc: "29463-7", // weight
        validVisualizations: [
            "LineGraphWeekly",
            "BarChartDaily",
            "LineGraphAnnual",
            "ClockDaily"
        ]
    },
    "BloodPressure": {
        name: "Blood Pressure",
        profile: "Observation",
        loinc: "35094-2",// sys blood pressure
        validVisualizations: [
            "LineGraphWeekly",
            "LineGraphAnnual"
        ]
    },
    "BMI": {
        name: "Body mass Index",
        profile: "Observation",
        loinc: "39156-5",// bmi
        validVisualizations: [
            "LineGraphAnnual",
            "BarChartWeekly",
            "DoughnutWeekly"
        ]
    }
};

// a list of all valid data types supported by the system
const VALID_DATA_TYPES = Object.keys(DATA_SPECIFICATION);
// At runtime will be of the form
/*[
 "HeartRate",
 "BodyHeight",
 "BodyWeight",
 "BloodPressureSystolicAndDiastolic",
 "BMI"
 ]; */



// a list of all valid data ranges for individual users
const VALID_DATA_RANGES = ["Single", "Daily", "Weekly", "Monthly", "Annual"];

module.exports = {
    DATA_SPECIFICATION,
    VALID_DATA_TYPES,
    VALID_DATA_RANGES,
    VALID_SCHEMAS,
    VALID_VISUALIZATIONS,
    VALID_AGGREGATE_VISUALIZATIONS,
    AGGREGATE_VISUALIZATIONS_SECONDARY_NEEDED,
    COLORS
};

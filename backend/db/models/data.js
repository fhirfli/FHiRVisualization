const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.Promise = Promise;


const VALID_SCHEMAS = [
//    "HeartRate", "BodyHeight", "BodyWeight", "BloodPressureSystolicAndDiastolic", "BMI",
    "Observation", "Condition", "FamilyMemberHistory", "MedicationStatement", "Patient", "Organization"
];

const VALID_VISUALIZATIONS = [
    "BarChartDaily", "BarChartWeekly", "BarChartMonthly",
    "LineGraphWeekly", "LineGraphMonthly", "LineGraphAnnual",
    "DoughnutDaily", "DoughnutWeekly", "ClockWeekly"
];


const AGGREGATE_VISUALIZATIONS_SECONDARY_NEEDED = {
    "BarChart": false,
    "LineGraph": true,
    "DoughnutChart": false
};

const VALID_AGGREGATE_VISUALIZATIONS = Object.keys(AGGREGATE_VISUALIZATIONS_SECONDARY_NEEDED);
/*[
 "BarChart", "LineGraph", "DoughnutChart"
 ];*/


const COLORS = ['red', 'blue', 'green', 'yellow', 'indigo', 'navy', 'orange'];

/*
 "29463-7", // weight
 "65968-0", // sleep
 "63863-5", // hours of activity
 "35094-2",// sys blood pressure
 "39156-5"// bmi
 */
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
            "LineGraphAnnual",
            "ClockWeekly"
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

const VALID_DATA_TYPES = Object.keys(DATA_SPECIFICATION);
const VALID_DATA_RANGES = ["Single", "Daily", "Weekly", "Monthly", "Annual"];
/*[
 "HeartRate",
 "BodyHeight",
 "BodyWeight",
 "BloodPressureSystolicAndDiastolic",
 "BMI"
 ]; */


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

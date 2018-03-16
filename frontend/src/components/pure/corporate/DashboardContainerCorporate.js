import React from 'react';
import ReactDOM from 'react-dom';
import DonutCorporate from "./visualizations/DonutCorporate"; //Will change this to a folder of visualisation components
import BarChartCorporate from "./visualizations/BarChartCorporate";
import GroupBarChart from "./visualizations/GroupBarChart";
import LineGraphCorporate from "./visualizations/LineGraphCorporate";

import * as PropTypes from 'prop-types';

const colourMap = {
    red: '#ec5229',
    green: '#69da60',
    blue: '#76bbf1',
    yellow: '#fcee5f',
    indigo: '#5884f5',
    orange: '#ff6611',
    navy: '#123283'
};

// reference: https://stackoverflow.com/questions/41850864/get-average-of-every-group-of-n-elements-in-an-array
function groupAverage(arr, n, isum, idiv) {
    let fsum = isum || ((x, y) => x + y);
    let fdiv = idiv || ((x, y) => x / y);
    const result = [];
    for (let i = 0; i < arr.length;) {
        let sum = arr[0];
        for (let j = 0; j < n; j++) {
            // Check if value is numeric. If not use default value as 0
            if (i !== 0 || j !== 0) {
                sum = fsum(sum, arr[i++]);
            }
        }
        result.push(fdiv(sum, n));
    }
    return result;
}

export default class CorporateDashboardGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {data: {}, colour: {}, loadedValues: 0};
        this.loadData = this.loadData.bind(this);
        this.checkVisType = this.checkVisType.bind(this);
        this.renderVisualization = this.renderVisualization.bind(this);
        this.withDataReady = this.withDataReady.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    /*
     This function tests whether the data for a given data type has loaded
     */
    withDataReady(preference) {
        // first, no matter what, the main dataType must be present.
        return this.state.data[preference.mainDataType] &&
            (
                // if that condition is met, either
                (
                    // the secondary dataType is not present but state.data[mainDataType].self is present
                    (!preference.secondaryDataType && this.state.data[preference.mainDataType]['self']))
                ||
                // or state.data[mainDataType][secondaryDataType] is present
                (this.state.data[preference.mainDataType][preference.secondaryDataType])
            );
    }

    /*
     Iterates over this.props.preferences and loads data for each type - also queues a promise to format and place the data into state
     as soon as the data is loaded.
     */
    loadData() {
        // loop over preferences
        for (let i = 0; i < this.props.preferences.length; i++) {
            let preference = this.props.preferences[i];
            console.log("current preference: " + JSON.stringify(preference));

            if (preference.secondaryDataType) {
                this.props.loadData(preference.mainDataType, preference.secondaryDataType)
                    .then(() => {
                        let formattedData = this.formatDataForTwo(preference.mainDataType, preference.secondaryDataType);

                        // for logging only - the following line could be removed.
                        // console.log("FORMATTED DATA FOR 2 (AFTER RETURN): " + JSON.stringify(formattedData));
                    });
            }
            else {
                this.props.loadData(preference.mainDataType).then(() => {
                    let formattedData = this.formatDataForOne(preference.mainDataType);

                    // for logging only - the following line could be removed.
                    // console.log("FORMATTED DATA FOR 2 (AFTER RETURN): " + JSON.stringify(formattedData));
                });
            }
        }
    }

    /*
     Given a two data types, will take data from this.props.data and process it before storing in this.state
     also return the values - this is for logging purposes only - do not abuse it for functionality
     */
    formatDataForTwo(mainDataType, secondaryDataType) {
        // console.log("FORMAT DATA FOR 2: " + JSON.stringify(this.props.data[mainDataType][secondaryDataType]));

        // map over values and format into intermediate representation
        let values = this.props.data[mainDataType][secondaryDataType].map((xy) => {

            return ( {x: (Math.floor(xy.valueA * 10) / 10), y: (Math.round(xy.valueB * 10) / 10)} );
        });

        console.log("Formatting data for two - values.length = " + values.length);

        // console.log("FORMATTED DATA FOR 2 (BEFORE RETURN): " + JSON.stringify(values));
        if (values.length > 100) {
            let intermediate = groupAverage(values, values.length / 100, (a, b) => {
                return {x: a.x + b.x, y: a.y + b.y}
            }, (a, b) => {
                return {x: a.x / b, y: a.y / b}
            });
            console.log("Intermediate length is " + intermediate.length);
            values = intermediate;
        }

        // Mutation-free (no inplace changes) way of updating this.state.data
        if (values.length > 0) {
            let data = Object.assign({}, this.state.data);
            let count = this.state.loadedValues;
            data[mainDataType] = data[mainDataType] || {};
            data[mainDataType][secondaryDataType] = values;
            this.setState({data, loadedValues: count + 1});
        }

        // not necassary, but if you want to log it
        return values;
    }

    /*
     Given a data type, will take data from this.props.data and process it before storing in this.state
     also return the values - this is for logging purposes only - do not abuse it for functionality
     */
    formatDataForOne(mainDataType) {
        // console.log("FORMAT DATA FOR 1: " + JSON.stringify(this.props.data[mainDataType].self));

        // map over values and format into intermediate representation
        let values = this.props.data[mainDataType].self.map((value, index) => {
            return ( {x: index, y: (Math.round(value.value * 10) / 10)} );
        });
        // console.log("FORMATTED DATA FOR 1 (BEFORE RETURN): " + JSON.stringify(values));

        console.log("Formatting data for two - values.length = " + values.length);
        if (values.length > 100) {
            let intermediate = groupAverage(values, values.length / 100, (a, b) => {
                return {x: a.x + b.x, y: a.y + b.y}
            }, (a, b) => {
                return {x: a.x / b, y: a.y / b}
            });
            console.log("Intermediate length is " + intermediate.length);
            values = intermediate;
        }


        // Mutation-free (no inplace changes) way of updating this.state.data
        if (values.length > 0) {
            let data = Object.assign({}, this.state.data);
            data[mainDataType] = data[mainDataType] || {};
            data[mainDataType]['self'] = values;
            let count = this.state.loadedValues;

            this.setState({data, loadedValues: count + 1});
        }

        // not necessary, but if you want to log it
        return values;
    }


    // given a list of visualizations, returns a number in the range 0 - 4 to indicate what type of visualizations it is.
    checkVisType(vis) { // Ammendable visualisation checker
        if (vis.visualization.includes("BarChart")) {
            return 1;
        }
        else if (vis.visualization.includes("LineGraph")) {
            return 2;
        }
        else if (vis.visualization.includes("Doughnut")) {
            return 3;
        }
        else if (vis.visualization.includes("GroupBarChart")) {
            return 4;
        }
        return 0;
    }

    /*
     Constructs a visualizations out of a preference
     */
    renderVisualization(preference, index) {
        let dataType = preference.mainDataType;
        let secondaryDataType = preference.secondaryDataType;
        let title;
        let colour = preference.colour;
        if (secondaryDataType) {
            title = "Employee average " + dataType + " against " + secondaryDataType
        } else {
            title = "Employee average " + dataType + " distribution"
        }

        switch (this.checkVisType(preference)) {
            case 1:
                return (<BarChartCorporate key={dataType + index} className="dash__component"
                                           data={ this.state.data[dataType]['self'] }
                                           title={ title }
                                           //Add dataType={}
                                           colour={ colourMap[colour] }/>);
                break;
            case 2:
                return (<LineGraphCorporate key={dataType + index} className="dash__component"
                                            data={ this.state.data[dataType][secondaryDataType] }
                                            title={ title }
                                            //Add dataType={}
                                            colour={ colourMap[colour] }/>);
                break;
            case 3:
                return (
                    <DonutCorporate key={dataType + index} className="dash__component" data={ this.state.data[dataType]['self'] }
                           title={ title } colour={ colour }/>);
                break;
            case 4:
                return (<GroupBarChart key={dataType + index} className="dash__component"
                                       data={ this.state.data[dataType]['self'] }
                                       title={ title } colour={ colourMap[colour] }/>);
                break;
            default:
                console.log("Unkown Data visualisation");
                break;
        }
    }


    render() {
        return (
            <div className="dash__container">
                {
                    this.state.loadedValues > 0 &&
                    // if we have preferences
                    this.props.preferences &&
                    // select the preferences where data has loaded
                    this.props.preferences.filter(this.withDataReady)
                    // and render them
                        .map(this.renderVisualization)
                }
            </div>
        )
    }
}

CorporateDashboardGrid.propTypes = {
    preferences: PropTypes.array,
    data: PropTypes.object,
    loadData: PropTypes.func,
};

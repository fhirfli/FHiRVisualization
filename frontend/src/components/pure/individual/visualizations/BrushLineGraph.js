import React from 'react';
import {VictoryArea, VictoryGraph, VictoryChart, VictoryLabel, VictoryAxis} from 'victory';

import * as PropTypes from 'prop-types';


export default class BrushLineGraph extends React.Component {
    constructor(props) {
        super();
        this.state = {data: {}};
    }

    changeXAxis() {
        switch (this.props.dataRange) {
            case 'Weekly':
                let xAxis = this.getXAxisFor(this.props.dataRange);
                let newData = [];
                for (var i = 0; i < 7; i++) {
                    newData.push({x: xAxis[i], y: this.props.data[i].y})
                }
                return newData;
                break;
            case 'Monthly':
                let xAxis1 = this.getXAxisFor(this.props.dataRange);
                let newData1 = [];
                for (var i = 0; i < 4; i++) {
                    newData.push({x: xAxis1[i], y: this.props.data[i].y})
                }
                return newData1;
                break;
        }
    }

    render() {
        const styles = this.getStyles();
        return (
            <div className="dash__component">
                <VictoryLabel x={5} y={24} style={ styles.title }
                              text={ "Your " + this.props.dataRange + " " + this.props.title + " Breakdown" }
                />
                <VictoryChart
                    range={{y: this.getYAxisFor(this.props.dataRange)}}
                    animate={{duration: 200}}
                >
                    <VictoryArea
                        standalone={false}
                        data={ this.changeXAxis() }
                        style={{
                            data: {
                                stroke: this.getColour(this.props.colour),
                                strokeWidth: 4.5,
                                fill: this.getColour(this.props.colour)
                            }
                        }}

                    />
                    <VictoryAxis dependentAxis
                                 style={{
                                     grid: {stroke: "#e4e4e430"},
                                     axis: {stroke: "#74747450"},
                                     tickLabels: {fontSize: 15, padding: 5},
                                     axisLabel: {fontSize: 23, padding: 10}
                                 }}
                                 label={this.props.ylabel}
                                 axisLabelComponent={<VictoryLabel transform="translate(-20 0)" align={"left"}/>}
                    />
                    <VictoryAxis
                        standalone={false}
                        style={{
                            axis: {stroke: "#74747450"},
                            tickLabels: {fontSize: 20, padding: 40, angle: 310, textAnchor: 'end'}
                        }}
                        tickLabelComponent={<VictoryLabel transform="translate(0 -18)" align={"right"}/>}
                        tickValues={ this.getXAxisFor(this.props.dataRange) }
                    />
                </VictoryChart>
            </div>
        )
    }

    getXAxisFor(dataRange) {
        switch (dataRange) {
            case 'Daily':
                return ([this.props.data.x]);
                break;
            case 'Weekly':
                return (['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
                break;
            case 'Monthly':
                return (['Week 1', 'Week 2', 'Week 3', 'Week 4']);
                break;
            case 'Annual':
                return (['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
                break;
                console.log("Unknown data Range");
        }
    }

    getYAxisFor(dataType) {
        switch (dataType) {
            case 'HeartRate':
                return ([0, 150]);
                break;
            case 'BodyWeight':
                return ([100, 150]);
                break;
            case 'BodyHeight':
                return ([150, 300]);
                break;
            case 'BMI':
                return ([0, 30]);
                break;
            case 'BloodPressure':
                return ([0, 2]);
                break;
                console.log("Unknown data type");
        }
    }

    getColour(colour) {
      switch (colour) {
        case 'blue': return ("#008bf9");
        case 'red': return ("#ec5229");
        case 'yellow': return ("#fcee5f");
        case 'green': return ("#69da60");
        case 'indigo': return ("#5884f5");
        case 'orange': return ("#ff6611");
        case 'navy': return ("#123283");
        default: return;
      }
    }

    getStyles() {
        return {
            title: {
                //marginLeft: "-45%",
                float: "left",
                marginBottom: "-10%",
                fill: "#000000",
                fontFamily: "Avenir",
                fontSize: "18px",
            },
        };
    }
}

BrushLineGraph.propTypes = {
    data: PropTypes.array, // whatever `this.state.videos` is
    title: PropTypes.any,
    colour: PropTypes.any,
    dataRange: PropTypes.any,
    ylabel: PropTypes.string
};

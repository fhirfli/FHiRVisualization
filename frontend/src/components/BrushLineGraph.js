import React from 'react';
import { VictoryArea, VictoryGraph, VictoryChart, VictoryLabel, VictoryAxis } from 'victory';

import * as PropTypes from 'prop-types';


export default class BrushLineGraph extends React.Component {
    constructor(props) {
        super();
        this.state = {data: {}};
    }

    changeXAxis() {
      switch(this.props.dataRange) {
        case 'Weekly':
          let xAxis = this.getXAxisFor(this.props.dataRange)
          let newData = [];
          for(var i = 0; i < 7; i++) {
            newData.push({ x:xAxis[i], y: this.props.data[i].y })
          }
          return newData;
          break;
        case 'Monthly':
          let xAxis1 = this.getXAxisFor(this.props.dataRange)
          let newData1 = [];
          for(var i = 0; i < 4; i++) {
            newData.push({ x:xAxis1[i], y: this.props.data[i].y })
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
                range={{ y: this.getYAxisFor(this.props.dataRange) }}
            >
                <VictoryArea
                    standalone={false}
                    data={ this.changeXAxis() }
                    style={{ data: { stroke: this.props.colour,
                                    strokeWidth: 4.5,
                                    fill: this.props.colour }
                                  }}

                />
                <VictoryAxis dependentAxis
                style={{
                  grid: {stroke: "#e4e4e430"},
                  axis: {stroke: "#74747450"},
                  tickLabels: {fontSize: 15, padding: 10 }
                }}
                />
                <VictoryAxis
                  standalone={false}
                  //style={styles.axisYears}
                  style={{
                    axis: {stroke: "#74747450"},
                    tickLabels: {fontSize: 15, padding: 40, angle: 270 }
                  }}
                  tickLabelComponent={<VictoryLabel align={"right"}/>}
                  tickValues={ this.getXAxisFor(this.props.dataRange) }
                />
            </VictoryChart>
          </div>
        )
    }

    getXAxisFor(dataRange) {
      switch(dataRange) {
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
      switch(dataType) {
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


    getStyles() {
    const BLUE_COLOR = "#76bbf1";
    const RED_COLOR = "#ec5229";
    const YELLOW_COLOR = "#fcee5f";
    const GREEN_COLOR = "#69da60";

    return {
      title: {
        //marginLeft: "-45%",
        float: "left",
        marginBottom: "-10%",
        fill: "#000000",
        fontFamily: "Avenir",
        fontSize: "18px",
      },
      labelNumber: {
        textAnchor: "middle",
        fill: "#ffffff",
        fontFamily: "inherit",
        fontSize: "14px"
      },

      // INDEPENDENT AXIS
      axisYears: {
        axis: { stroke: "black", strokeWidth: 1},
        ticks: {
          size: (tick) => {
            const tickSize =
              tick.getFullYear() % 5 === 0 ? 10 : 5;
            return tickSize;
          },
          stroke: "black",
          strokeWidth: 1
        },
        tickLabels: {
          fill: "black",
          fontFamily: "inherit",
          fontSize: 16
        }
      },

      // DATA SET ONE
      axisOne: {
        grid: {
          stroke: (tick) =>
            tick === -10 ? "transparent" : "#ffffff",
          strokeWidth: 2
        },
        axis: { stroke: BLUE_COLOR, strokeWidth: 0 },
        ticks: { strokeWidth: 0 },
        tickLabels: {
          fill: BLUE_COLOR,
          fontFamily: "inherit",
          fontSize: 16
        }
      },
      labelOne: {
        fill: BLUE_COLOR,
        fontFamily: "inherit",
        fontSize: 12,
        fontStyle: "italic"
      },
      lineOne: {
        data: { stroke: BLUE_COLOR, strokeWidth: 4.5, fill: BLUE_COLOR }
      },
      axisOneCustomLabel: {
        fill: BLUE_COLOR,
        fontFamily: "inherit",
        fontWeight: 300,
        fontSize: 21
      },
    };
  }
}

BrushLineGraph.propTypes = {
    data: PropTypes.array, // whatever `this.state.videos` is
    title: PropTypes.any,
    colour: PropTypes.any,
    dataRange: PropTypes.any,
};

import React from 'react';
import {
    VictoryArea,
    VictoryAxis,
    VictoryGraph,
    VictoryBrushContainer,
    VictoryLine,
    VictoryChart,
    VictoryTheme,
    VictoryLabel,
    VictoryScatter
} from 'victory';

import * as PropTypes from 'prop-types';


export default class LineGraphCorporate extends React.Component {
    constructor(props) {
        super();
    }

    /*
     onLoad(endPoint, dataType) {
     this.setState((endPoint, dataType) => {
     return {
     dataType = dataType,
     data = endPoint
     }
     });
     }
     componentDidMount() {
     //Call loading Data function here.
     this.onLoad();
     }
     */

    render() {
        const styles = this.getStyles();
        return (
            <div className="dash__component">
                <VictoryLabel x={5} y={24} style={ styles.title }
                              text={ this.props.title }
                />
                <VictoryChart
                    animate={{duration: 200}}
                    style={ styles.axisOne }
                >
                    <VictoryScatter
                        data={ this.props.data }
                        style={{
                            data: {
                                stroke: this.props.colour,
                                strokeWidth: 4.5,
                                fill: this.props.colour
                            }
                        }}
                    />
                    <VictoryAxis
                        standalone={false}
                        axisLabelComponent={<VictoryLabel text={ this.getLabelTitle() } style={ styles.labelTitle }/>}
                    />
                    <VictoryAxis
                        dependentAxis
                        standalone={false}
                        axisLabelComponent={<VictoryLabel text={ this.getLabelDependentTitle() } style={ styles.labelTitle } />}
                    />
                </VictoryChart>
            </div>
        )
    }

    getLabelTitle() {
      if(this.props.title.includes("HeartRate")) {
        return ("Heart Rate /bpm");
      }
      else if(this.props.title.includes("BodyWeight")) {
        return("Body Weight /kg");
      }
      else if(this.props.title.includes("BodyHeight")) {
        return("Body Height/ cm");
      }
      else if(this.props.title.includes("BMI")) {
        return("Body Mass Index");
      }
      else { return; }
    }

    getLabelDependentTitle() {
      let pattern = "against";
      let sliced = this.props.title.substr(this.props.title.indexOf(pattern) + pattern.length, this.props.title.length);
      if(this.props.title.includes(pattern)) {
        if(sliced.includes("HeartRate")) {
          return ("Heart Rate /bpm");
        }
        else if(sliced.includes("BodyWeight")) {
          return("Body Weight /kg");
        }
        else if(sliced.includes("BodyHeight")) {
          return("Body Height/ cm");
        }
        else if(sliced.includes("BMI")) {
          return("Body Mass Index");
        }
        else { return; }
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
                fontSize: "13px",
            },
            labelTitle: {
                float: "left",
                marginBottom: "-10%",
                fill: "#000000",
                fontFamily: "Avenir",
                fontSize: "12px",
            },
            // DATA SET ONE
            axisOne: {
                grid: {
                    stroke: (tick) =>
                        tick === -10 ? "transparent" : "#ffffff",
                    strokeWidth: 2
                },
                axis: {stroke: BLUE_COLOR, strokeWidth: 0},
                ticks: {strokeWidth: 0},
                tickLabels: {
                    fill: BLUE_COLOR,
                    fontFamily: "inherit",
                    fontSize: 16
                }
            },
        };
    }
}

LineGraphCorporate.propTypes = {
    data: PropTypes.array, // whatever `this.state.videos` is
    title: PropTypes.any,
    colour: PropTypes.any,
};

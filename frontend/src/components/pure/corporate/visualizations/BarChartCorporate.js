import React from 'react';
import * as Victory from 'victory';
import * as PropTypes from 'prop-types';


export default class BarChartCoporate extends React.Component {
    constructor(props) {
        super(props);
        console.log("RENDERING VIS IN BAR CHART: " + JSON.stringify(this.props));
    }

    render() {


        const styles = this.getStyles();
        return (
            <div className="dash__component">
                <Victory.VictoryLabel x={5} y={24} style={ styles.title }
                                      text={ this.props.title }
                />
                <Victory.VictoryChart>
                    <Victory.VictoryBar
                        animate={{duration: 200}}
                        style={{
                            data: {
                                fill: this.props.colour,
                                padding: 5
                            }
                        }}
                        alignment="start"
                        cornerRadius={2}
                        barRatio={0.5}
                        data={this.props.data}
                        categories={{x: this.getXAxisFor(this.props.dataRange)}}
                    />
                    <Victory.VictoryAxis
                        standalone={false}
                        tickValues={ this.getXAxisFor(this.props.dataRange) }
                        axisLabelComponent={<Victory.VictoryLabel text={ this.getLabelTitle() } style={ styles.labelTitle } />}
                    />
                    <Victory.VictoryAxis
                        dependentAxis
                        standalone={false}
                        tickValues={ this.getYAxisFor(this.props.title)}
                        axisLabelComponent={<Victory.VictoryLabel text={ this.getLabelDependentTitle() } style={ styles.labelTitle } />}
                    />
                </Victory.VictoryChart>
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
                return ([0, 150]);
                break;
            case 'BodyHeight':
                return ([0, 300]);
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
        return {
            title: {
                //textAnchor: "start",
                //marginLeft: "-20px",
                //verticalAnchor: "end",
                //marginLeft: "-70%",
                float: "left",
                marginBottom: "-10%",
                fill: "#000000",
                fontFamily: "Avenir",
                fontSize: "13px",
            },
            labelNumber: {
                textAnchor: "middle",
                fill: "#ffffff",
                fontFamily: "inherit",
                fontSize: "14px"
            },
            labelTitle: {
                float: "left",
                marginBottom: "-10%",
                fill: "#000000",
                fontFamily: "Avenir",
                fontSize: "12px",
            },

        }
    }
}

BarChartCoporate.propTypes = {
    data: PropTypes.array, // whatever `this.state.videos` is
    title: PropTypes.any,
    colour: PropTypes.any,
    dataRange: PropTypes.string
};

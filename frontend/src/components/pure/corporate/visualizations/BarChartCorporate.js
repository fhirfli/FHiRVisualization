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
                        //style={styles.axisYears}
                        tickValues={ this.getXAxisFor(this.props.dataRange) }
                        /*
                         tickFormat={
                         (x) => {
                         if (x.getFullYear() === 2000) {
                         return x.getFullYear();
                         }
                         if (x.getFullYear() % 5 === 0) {
                         return x.getFullYear().toString().slice(2);
                         }
                         }
                         }
                         */
                    />
                    <Victory.VictoryAxis
                        dependentAxis
                        standalone={false}
                        // style={{
                        //   grid: {stroke: "grey"},
                        //   ticks: {stroke: "grey", size: 5},
                        // }}
                        tickValues={ this.getYAxisFor(this.props.title)}
                    />
                </Victory.VictoryChart>
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
                fontSize: "18px",
            },
            labelNumber: {
                textAnchor: "middle",
                fill: "#ffffff",
                fontFamily: "inherit",
                fontSize: "14px"
            }

        }
    }
}

BarChartCoporate.propTypes = {
    data: PropTypes.array, // whatever `this.state.videos` is
    title: PropTypes.any,
    colour: PropTypes.any,
    dataRange: PropTypes.string
};

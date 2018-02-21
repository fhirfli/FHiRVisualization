import React from 'react';
import * as Victory from 'victory';
import * as PropTypes from 'prop-types';


export default class BarChart extends React.Component {
    constructor(props) {
        super(props);
        console.log("RENDERING VIS IN BAR CHART: " + JSON.stringify(this.props.data));
    }

    render() {
        const styles = this.getStyles();
        return (
            <div className="dash__component">
                <Victory.VictoryLabel x={5} y={24} style={ styles.title }
                                      text={ "Your " + this.props.dataRange + " " + this.props.title + " Breakdown" }
                />
                <Victory.VictoryChart
                    range={{y: this.getYAxisFor()}}
                    animate={{duration: 200}}
                >
                    <Victory.VictoryBar
                        style={{
                            data: {
                                fill: this.props.colour,
                                padding: 5
                            }
                        }}
                        alignment="start"
                        cornerRadius={2}
                        barRatio={0.5}
                        data={ this.getData() }
                        //categories={{ x: this.getXAxisFor(this.props.dataRange) }}
                    />
                    <Victory.VictoryAxis
                        standalone={false}
                        //style={styles.axisYears}
                        style={{
                            axis: {stroke: "#74747450"},
                            tickLabels: {fontSize: 20, padding: 40, angle: 310, textAnchor: 'end'}
                        }}
                        tickLabelComponent={<Victory.VictoryLabel transform="translate(5 -18)" align={"right"}/>}


                        tickValues={ this.getXAxisFor(this.props.dataRange) }
                    />
                    <Victory.VictoryAxis dependentAxis
                                         standalone={false}
                                         style={{
                                             axis: {stroke: "#74747450"},
                                             tickLabels: {fontSize: 15, padding: 5},
                                             axisLabel: {fontSize: 23, padding: 10}
                                         }}
                                         tickLabelComponent={<Victory.VictoryLabel align={"right"}/>}

                                         label={this.props.ylabel}

                                         axisLabelComponent={<Victory.VictoryLabel transform="translate(-20 0)"
                                                                                   align={"left"}/>}

                        //tickValues={ this.getXAxisFor(this.props.dataRange) }
                    />
                </Victory.VictoryChart>
            </div>
        )
    }

    getData() {
        let xValues = this.getXAxisFor(this.props.dataRange);
        /*let newData = this.props.data.map((xy, index) => {
         return( { x: xValues[index], y: xy.y } );
         });*/
        if (this.props.data) {
            let newData = [];
            for (var i = 0; i < this.props.data.length; i++) {
                newData.push({x: xValues[i], y: this.props.data[i].y})
            }
            console.log("THIS IS THE NEW DATA: " + JSON.stringify(newData));
            return (newData);
        }
    }

    getXAxisRangeFor(dataRange) {
        switch (dataRange) {
            case 'Daily':
                return ([this.props.data.x]);
                break;
            case 'Weekly':
                return ([0, 7]);
                break;
            case 'Monthly':
                return ([0, 4]);
                break;
            case 'Annual':
                return ([0, 12]);
                break;
                console.log("Unknown data Range");
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
                fontSize: "18px",
            },
            labelNumber: {
                textAnchor: "middle",
                fill: "#ffffff",
                fontFamily: "inherit",
                fontSize: "14px"
            },

            //WEEKLY axis
            weeklyXAxis: {
                axis: {stroke: "#74747450"},
                tickLabels: {fontSize: 15, padding: 5, angle: 90},
            }
        }
    }
}

BarChart.propTypes = {
    data: PropTypes.array, // whatever `this.state.videos` is
    title: PropTypes.any,
    colour: PropTypes.any,
    dataRange: PropTypes.string,
    ylabel: PropTypes.string
};

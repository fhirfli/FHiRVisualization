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
                                fill: this.getColour(this.props.colour),
                                padding: 5
                            }
                        }}
                        alignment="start"
                        cornerRadius={2}
                        barRatio={0.5}
                        events={[{
                              target: "data",
                              eventHandlers: {
                                onMouseOver: () => {
                                  return [
                                    {
                                      target: "data",
                                      mutation: (props) => {
                                        return { style: Object.assign({}, props.style, {fill: this.getColour(this.props.colour) + "75"}) };
                                      }
                                    },
                                    {
                                      target: "labels",
                                      mutation: (props) => {
                                        console.log("props: " + JSON.stringify(props));
                                        return { text: this.props.data[props.index].y };
                                      }
                                    },
                                    {
                                      target: "labels",
                                      mutation: (props) => {
                                        return { textAnchor: "right" };
                                      }
                                    }
                                  ]},
                                  onMouseOut: () => {
                                    return [
                                      {
                                        target: "data",
                                        mutation: (props) => {
                                          return {
                                            style: Object.assign({}, props.style, {fill: this.getColour(this.props.colour)})
                                          };
                                        }
                                      },
                                      {
                                        target: "labels",
                                        mutation: (props) => {
                                          return { text: "" };
                                        }
                                      }
                                    ]}
                                }
                            }]}
                        data={ this.getData() }
                    />
                    <Victory.VictoryAxis
                        standalone={false}
                        style={{
                            axis: {stroke: "#74747450"},
                            tickLabels: {fontSize: 20, padding: 40, angle: 310, textAnchor: 'end'}
                        }}
                        tickLabelComponent={<Victory.VictoryLabel transform="translate(5 -18)" align={"right"}/>}

                        tickValues={ this.getXAxisRangeFor(this.props.dataRange) }
                        tickFormat={(t) => { if(t.startsWith("none")) { return ""; } else { return t; } } }
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
                    />
                </Victory.VictoryChart>
            </div>
        )
    }

    getData() {
        let xValues = this.getXAxisFor(this.props.dataRange);
        if (this.props.data) {
            let newData = [];
            for (let i = 0; i < this.props.data.length; i++) {
                newData.push({x: xValues[i], y: this.props.data[i].y})
            }
            return (newData);
        }
    }

    getXAxisRangeFor(dataRange) {
        switch (dataRange) {
            case 'Daily':
                return ([0, 4]);
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
      console.log("data range: " + dataRange);
        switch (dataRange) {
            case 'Daily':
                let daily = [];
                for(let i = 0; i < 25; i++) {
                  if((i % 6) === 0) {
                    daily.push(i + ":00");
                  }
                  else {
                    daily.push("none" + i);
                  }
                }
                console.log("xAxis: " + JSON.stringify(daily));
                return (daily);
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

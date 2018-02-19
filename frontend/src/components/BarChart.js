import React from 'react';
import {VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack, VictoryLabel } from 'victory';
import * as PropTypes from 'prop-types';


export default class BarChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      this.getAxisForRange(this.props.dataRange);

      const styles = this.getStyles()
        return (
            <div className="dash__component">
              <VictoryLabel x={5} y={24} style={ styles.title }
                text={ this.props.title }
              />
                <VictoryBar
                    style={{
                        data: {fill: this.props.colour }
                    }}
                    barRatio={0.9}
                    cornerRadius={2}
                    data={this.props.data}
                />
                <VictoryAxis
                  standalone={false}
                  //style={styles.axisYears}
                  //tickValues={tickValues}
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
            </div>
        )
    }

    getAxisForRange(range) {
      switch(range) {
        case 'Daily':
        case 'Weekly':
          console.log("NEED A WEEKLY AXIS OVER: " + JSON.stringify(this.props.data));
        case 'Monthly':
        case 'Annual':
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

BarChart.propTypes = {
    data: PropTypes.array, // whatever `this.state.videos` is
    title: PropTypes.any,
    colour: PropTypes.any,
    dataRange: PropTypes.string
};

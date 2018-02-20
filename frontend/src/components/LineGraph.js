import React from 'react';
import { VictoryArea, VictoryAxis, VictoryChart, VictoryTheme, VictoryLabel } from 'victory';
import * as PropTypes from 'prop-types';


export default class LineGraph extends React.Component {
    constructor(props) {
        super();
    }

    render() {
      const styles = this.getStyles()
        return (
          <div className="dash__component">
            <VictoryLabel x={5} y={24} style={ styles.title }
              text= { this.props.title }
            />
            <VictoryChart
                domain={{ y: this.getYAxisFor(this.props.title) }}
            >
                <VictoryArea
                    style={{
                        data: {stroke: this.props.colour},
                        parent: {border: "1px solid #ccc"}
                    }}
                    data={ this.props.data }
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
}

LineGraph.propTypes = {
    data: PropTypes.array, // whatever `this.state.videos` is
    title: PropTypes.any,
    colour: PropTypes.any,
    dataRange: PropTypes.any,
};

import React from 'react';
import { VictoryArea, VictoryAxis, VictoryChart, VictoryTheme, VictoryLabel } from 'victory';
import * as PropTypes from 'prop-types';


export default class LineGraph extends React.Component {
    constructor(props) {
        super();
        this.state = {data: {}};
    }

    componentDidMount() {
      this.moveDataFromPropsToState();
    }

    moveDataFromPropsToState() {
      let dataList = this.changeXAxis();

      var obj = Object.assign({}, this.state);
      obj.data = obj.data || {};
      obj.data = dataList;

      this.setState(obj);
    }

    changeXAxis() {
      switch(this.props.dataRange) {
        case 'Weekly':
          let xAxis = getXAxisFor(this.props.dataRange)
          let newData = [];
          for(var i = 0; i < 7; i++) {
            newData.push({ x:xAxis[i], y: this.props.data[i].y })
          }
          return newData;
          break;
        case 'Monthly':
          let xAxis1 = getXAxisFor(this.props.dataRange)
          let newData1 = [];
          for(var i = 0; i < 4; i++) {
            newData.push({ x:xAxis1[i], y: this.props.data[i].y })
          }
          return newData1;
          break;
      }
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
                style={{
                  parent: {
                    border: "1px solid rgba(200, 200, 200, 0.61)"
                  }
                }}
            >
                <VictoryArea
                    style={{
                        data: {stroke: this.props.colour},
                        parent: { border: "1px solid rgb(231, 231, 231, 0.3)" }
                    }}
                    data={ this.state.data }
                    categories={{ x: this.getXAxisFor(this.props.dataRange) }}
                />
                <VictoryAxis dependentAxis
                style={{
                  grid: {stroke: "grey"},
                  ticks: {stroke: "grey", size: 5},
                }}
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

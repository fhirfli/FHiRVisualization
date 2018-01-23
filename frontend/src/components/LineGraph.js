import React from 'react';
import { VictoryLine, VictoryChart } from 'victory';
import * as PropTypes from 'prop-types';


export default class LineGraph extends React.Component {
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
  */

  componentDidMount() {
    this.onLoad();
  }


  render() {
    return (
      <VictoryChart
        theme={ VictoryTheme.material }
      >
        <VictoryLine
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc"}
          }}
          data={ this.state.data }
        />
      </VictoryChart>
    )
  }
}

LineGraph.propTypes = {
  data: PropTypes.array // whatever `this.state.videos` is
};

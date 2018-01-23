import React from 'react';
import { VictoryPie } from 'victory';
import * as PropTypes from 'prop-types';


export default class Donut extends React.Component {

  /*constructor(props) {
    super();

    this.state = { // Set default state values for the visualisation
      dataType = "Default",
      colour = "red",
      data = []
    }
  }

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
    //Call loading Data function here.
    this.onLoad();
  }

  render() {
    return (
      <VictoryPie
      innerRadius={90}
      colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}

      events={[{
          target: "data",
          eventHandlers: {
            onClick: () => {
              return [
                {
                  target: "data",
                  mutation: (props) => {
                    const fill = props.style && props.style.fill;
                    return fill === "#c43a31" ? null : { style: { fill: "#c43a31" } };
                  }
                }, {
                  target: "labels",
                  mutation: (props) => {
                    return props.text === "clicked" ? null : { text: "clicked" };
                  }
                }
              ];
            }
          }
        }]}
      data={ this.state.data }
    />
    )
  }
}

Donut.propTypes = {
  data: PropTypes.array // whatever `this.state.videos` is
};

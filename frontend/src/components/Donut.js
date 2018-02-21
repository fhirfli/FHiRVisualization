import React from 'react';
import {VictoryPie, VictoryLabel } from 'victory';
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
    }

    render() {
      const styles = this.getStyles()
        return (
          <div className="dash__component">
            <VictoryLabel x={5} y={24} style={ styles.title }
              text={ "Your " + this.props.dataRange + " " + this.props.title + " Breakdown" }
            />
            <VictoryPie
                innerRadius={50}
                width={250} height={250}
                colorScale={this.getColourSchemeFor(this.props.colour)}
                style={{ labels: { fontSize: 10} }}
                labels={(d) => d.y}
                padAngle={2}
                //labelComponent={<VictoryLabel angle={45}/>}
                data={ this.props.data }
            />
          </div>
        )
    }

    getColourSchemeFor(colour) {
      console.log("COLOUR: " + colour);
      let colourScheme = [];
      switch(colour) {
        case 'blue':
          if(this.props.data) {
            for(var i = 0; i < this.props.data.length; i++) {
              let newColour = "#008bf9" + ((i + 1) * Math.floor(100 / this.props.data.length)); //(Math.floor(Math.random() * 100)); //"rgba(colour, Math.Random())"
              colourScheme.push(newColour);
            }
          }
          case 'red':
          if(this.props.data) {
            for(var i = 0; i < this.props.data.length; i++) {
              let newColour = "#ec5229" + ((i + 1) * Math.floor(100 / this.props.data.length)); //(Math.floor(Math.random() * 100)); //"rgba(colour, Math.Random())"
              colourScheme.push(newColour);
            }
          }
          case 'yellow':
          if(this.props.data) {
            for(var i = 0; i < this.props.data.length; i++) {
              let newColour = "#fcee5f" + ((i + 1) * Math.floor(100 / this.props.data.length)); //(Math.floor(Math.random() * 100)); //"rgba(colour, Math.Random())"
              colourScheme.push(newColour);
            }
          }
          case 'green':
          if(this.props.data) {
            for(var i = 0; i < this.props.data.length; i++) {
              let newColour = "#21c814" + ((i + 1) * Math.floor(100 / this.props.data.length)); //(Math.floor(Math.random() * 100)); //"rgba(colour, Math.Random())"
              colourScheme.push(newColour);
            }
          }
      }
      return colourScheme;
    }

    getStyles() {
      const BLUE_COLOR = "#008bf9";
      const RED_COLOR = "#ec5229";
      const YELLOW_COLOR = "#fcee5f";
      const GREEN_COLOR = "#69da60";

      return {
        title: {
          //marginLeft: "-60%",
          float: "left",
          marginBottom: "-5%",
          fill: "#000000",
          fontFamily: "Avenir",
          fontSize: "18px",
        },
        subTitle: {
          float: "left",
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

        // INDEPENDENT AXIS
        axisYears: {
          axis: { stroke: "black", strokeWidth: 1},
          ticks: {
            size: (tick) => {
              const tickSize =
              tick.getFullYear() % 5 === 0 ? 10 : 5;
              return tickSize;
            },
            stroke: "black",
            strokeWidth: 1
          },
          tickLabels: {
            fill: "black",
            fontFamily: "inherit",
            fontSize: 16
          }
        },

        // DATA SET ONE
        axisOne: {
          grid: {
            stroke: (tick) =>
            tick === -10 ? "transparent" : "#ffffff",
            strokeWidth: 2
          },
          axis: { stroke: BLUE_COLOR, strokeWidth: 0 },
          ticks: { strokeWidth: 0 },
          tickLabels: {
            fill: BLUE_COLOR,
            fontFamily: "inherit",
            fontSize: 16
          }
        },
        labelOne: {
          fill: BLUE_COLOR,
          fontFamily: "inherit",
          fontSize: 12,
          fontStyle: "italic"
        },
        lineOne: {
          data: { stroke: BLUE_COLOR, strokeWidth: 4.5, fill: BLUE_COLOR }
        },
        axisOneCustomLabel: {
          fill: BLUE_COLOR,
          fontFamily: "inherit",
          fontWeight: 300,
          fontSize: 21
        },

        // DATA SET TWO
        axisTwo: {
          axis: { stroke: RED_COLOR, strokeWidth: 0 },
          tickLabels: {
            fill: RED_COLOR,
            fontFamily: "inherit",
            fontSize: 16
          }
        },
        labelTwo: {
          textAnchor: "end",
          fill: RED_COLOR,
          fontFamily: "inherit",
          fontSize: 12,
          fontStyle: "italic"
        },
        lineTwo: {
          data: { stroke: RED_COLOR, strokeWidth: 4.5 }
        },

        // HORIZONTAL LINE
        lineThree: {
          data: { stroke: "#e95f46", strokeWidth: 2 }
        }
      };
    }
}

Donut.propTypes = {
    data: PropTypes.array, // whatever `this.state.videos` is
    title: PropTypes.any,
    colour: PropTypes.any,
    dataRange: PropTypes.any
};

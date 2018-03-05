import React from 'react';
import {VictoryPie, VictoryLabel} from 'victory';
import * as PropTypes from 'prop-types';


export default class Donut extends React.Component {

    render() {
        const styles = this.getStyles();
        return (
            <div className="dash__component">
                <VictoryLabel x={5} y={24} style={ styles.title }
                              text={ "Your " + this.props.dataRange + " " + this.props.title + " Breakdown (" + this.props.title + "/day)" }
                />
                <VictoryPie
                    innerRadius={50}
                    width={250} height={250}
                    colorScale={this.getColourSchemeFor(this.props.colour)}
                    style={{labels: {fontSize: 14, padding: 15}}}
                    labels={(d) => { if(d.y !== 0) { return d.y } } }
                    padAngle={2}
                    events={[{
                          target: "data",
                          eventHandlers: {
                            onMouseOver: () => {
                              return [
                                {
                                  target: "data",
                                  mutation: (props) => {
                                    return { style: Object.assign({}, props.style, {fill: this.getHoverColourFor(this.props.colour)}) };
                                  }
                                },
                                {
                                  target: "labels",
                                  mutation: (props) => {
                                    let week = this.furtherFormatData()
                                    return { text: week[props.index].x };
                                  }
                                }
                              ]},
                              onMouseOut: () => {
                                return [
                                  {
                                    target: "data",
                                    mutation: (props) => {
                                      let colours = this.getColourSchemeFor(this.props.colour)
                                      return {
                                        style: Object.assign({}, props.style, {fill: colours[props.index]})
                                      };
                                    }
                                  },
                                  {
                                    target: "labels",
                                    mutation: (props) => {
                                      if(this.props.data[props.index].y !== 0) {
                                        return { text: this.props.data[props.index].y }
                                      }
                                      else {
                                        return { text: "" };
                                      }
                                    }
                                  }
                                ]}
                            }
                        }]}

                    data={ this.props.data }
                />
            </div>
        )
    }

    furtherFormatData() {
      let week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      return this.props.data.map((xy, i) => {
        return { x: week[i], y: xy.y};
      });
    }

    getHoverColourFor(colour) {
      switch(colour) {
        case 'blue': return "#008bf9"; break;
        case 'red': return "#ec5229"; break;
        case 'yellow': return "#fcee5f"; break;
        case 'indigo': return "#5884f5"; break;
        case 'orange': return "#ff6611"; break;
        case 'navy': return "#123283"; break;
        default: return "#61d666"; break;
      }
    }

    getColourSchemeFor(colour) {
        let i;
        let colourScheme = [];
        switch (colour) {
            case 'blue':
                if (this.props.data) {
                    for (i = 0; i < this.props.data.length; i++) {
                        let newColour = "#008bf9" + ((i + 1) * Math.floor(100 / this.props.data.length)); //(Math.floor(Math.random() * 100)); //"rgba(colour, Math.Random())"
                        colourScheme.push(newColour);
                    }
                }
                break;
            case 'red':
                if (this.props.data) {
                    for (i = 0; i < this.props.data.length; i++) {
                        let newColour = "#ec5229" + ((i + 1) * Math.floor(100 / this.props.data.length)); //(Math.floor(Math.random() * 100)); //"rgba(colour, Math.Random())"
                        colourScheme.push(newColour);
                    }
                }
                break;
            case 'yellow':
                if (this.props.data) {
                    for (i = 0; i < this.props.data.length; i++) {
                        let newColour = "#fcee5f" + ((i + 1) * Math.floor(100 / this.props.data.length)); //(Math.floor(Math.random() * 100)); //"rgba(colour, Math.Random())"
                        colourScheme.push(newColour);
                    }
                }
                break;
            case 'green':
                if (this.props.data) {
                    for (i = 0; i < this.props.data.length; i++) {
                        let newColour = "#21c814" + ((i + 1) * Math.floor(100 / this.props.data.length)); //(Math.floor(Math.random() * 100)); //"rgba(colour, Math.Random())"
                        colourScheme.push(newColour);
                    }
                }
                break;
            case 'indigo':
            if (this.props.data) {
              for (i = 0; i < this.props.data.length; i++) {
                let newColour = "#5884f5" + ((i + 1) * Math.floor(100 / this.props.data.length)); //(Math.floor(Math.random() * 100)); //"rgba(colour, Math.Random())"
                colourScheme.push(newColour);
              }
            }
            break;
            case 'orange':
            if (this.props.data) {
              for (i = 0; i < this.props.data.length; i++) {
                let newColour = "#ff6611" + ((i + 1) * Math.floor(100 / this.props.data.length)); //(Math.floor(Math.random() * 100)); //"rgba(colour, Math.Random())"
                colourScheme.push(newColour);
              }
            }
            break;
            case 'navy':
            if (this.props.data) {
              for (i = 0; i < this.props.data.length; i++) {
                let newColour = "#123283" + ((i + 1) * Math.floor(100 / this.props.data.length)); //(Math.floor(Math.random() * 100)); //"rgba(colour, Math.Random())"
                colourScheme.push(newColour);
              }
            }
            break;
        }
        return colourScheme;
    }

    getStyles() {
        return {
            title: {
                float: "left",
                marginBottom: "-5%",
                fill: "#000000",
                fontFamily: "Avenir",
                fontSize: "18px",
            },
        };
    }
}

Donut.propTypes = {
    data: PropTypes.array, // whatever `this.state.videos` is
    title: PropTypes.any,
    colour: PropTypes.any,
    dataRange: PropTypes.any
};

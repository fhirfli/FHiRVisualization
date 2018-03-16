import React from 'react';
import { VictoryPie, VictoryLabel, VictoryPolarAxis, VictoryTheme } from 'victory';
import * as PropTypes from 'prop-types';


export default class Clock extends React.Component {

    render() {
        const styles = this.getStyles();
        return (
            <div className="dash__component">
                <VictoryLabel x={5} y={24} style={ styles.title }
                              text={ "Your " + this.props.dataRange + " " + this.props.title + " Breakdown" }
                />
                <svg width={280} height={280} >
                <VictoryPie
                    standalone={false}
                    innerRadius={50}
                    width={250} height={250}
                    colorScale={this.getColourSchemeFor(this.props.colour)}
                    style={{labels: {fontSize: 0}}}
                    labels={(d) => d.y}
                    padAngle={2}
                    data={ this.props.data }
                />

                <VictoryPolarAxis
                  width={250}
                  height={250}
                  //theme={VictoryTheme.material}
                  standalone={false}
                  startAngle={90}
                  endAngle={450}
                  tickValues={["00:00", "18:00", "12:00", "06:00", ""]}
                  labelPlacement="vertical"
                  animate={{
                    duration: 2000,
                    easing: "bounce"
                  }}
                />
                </svg>
            </div>
        )
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
                let newColour = "##123283" + ((i + 1) * Math.floor(100 / this.props.data.length)); //(Math.floor(Math.random() * 100)); //"rgba(colour, Math.Random())"
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
                //marginLeft: "-60%",
                float: "left",
                marginBottom: "-5%",
                fill: "#000000",
                fontFamily: "Avenir",
                fontSize: "18px",
            },
        };
    }
}

Clock.propTypes = {
    data: PropTypes.array, // whatever `this.state.videos` is
    title: PropTypes.any,
    colour: PropTypes.any,
    dataRange: PropTypes.any
};

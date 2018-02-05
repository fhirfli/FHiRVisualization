import React from 'react';
import {VictoryPie} from 'victory';
import * as PropTypes from 'prop-types';


export default class GoalRing extends React.Component {

    /*constructor(props) {
     super();

     this.state = { // Set default state values for the visualisation
     dataType = "Default",
     colour = "red",
     data = []
     }
     }
     */

    render() {
        return (
            <VictoryPie
                innerRadius={90}
                colorScale={["#4ec244", "#bfbfbf"]}

                events={[{
                    target: "data",
                    eventHandlers: {
                        onClick: () => {
                            return [
                                {
                                    target: "data",
                                    mutation: (props) => {
                                        const fill = props.style && props.style.fill;
                                        return fill === "#c43a31" ? null : {style: {fill: "#c43a31"}};
                                    }
                                }, {
                                    target: "labels",
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

GoalRing.propTypes = {
    data: PropTypes.array // whatever `this.state.videos` is
};

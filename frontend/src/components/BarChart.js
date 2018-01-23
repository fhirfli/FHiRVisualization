import React from 'react';
import {VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack} from 'victory';
import * as PropTypes from 'prop-types';


export default class BarChart extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <div>
                <h3>Click Me</h3>
                <VictoryBar
                    style={{
                        data: {fill: "#c43a31"}
                    }}
                    events={[{
                        target: "data",
                        eventHandlers: {
                            onClick: () => {
                                return [{
                                    target: "data",
                                    mutation: (props) => {
                                        const fill = props.style && props.style.fill;
                                        return fill === "black" ? null : {style: {fill: "black"}};
                                    }
                                },
                                    {
                                        target: "labels",
                                        mutation: (props) => {
                                            return props.text ? null : {text: "clicked"};
                                        }
                                    }];
                            }
                        }
                    }]}
                    data={this.props.data}
                />
            </div>
        )
    }
}

BarChart.propTypes = {
    data: PropTypes.array // whatever `this.state.videos` is
};

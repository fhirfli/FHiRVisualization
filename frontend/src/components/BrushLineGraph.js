import React from 'react';
import {VictoryGraph, VictoryBrushContainer, VictoryLine, VictoryChart, VictoryTheme} from 'victory';

import * as PropTypes from 'prop-types';


export default class BrushLineGraph extends React.Component {
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


     componentDidMount() {
     //Call loading Data function here.
     this.onLoad();
     }
     */

    render() {
        return (
            <VictoryChart
                theme={ VictoryTheme.material }
                containerComponent={
                    <VictoryBrushContainer
                        brushDimension="x"
                        brushDomain={{x: [0.1, 0.3]}}
                    />
                }
            >
                <VictoryLine
                    data={ this.props.data }

                />
            </VictoryChart>
        )
    }
}

BrushLineGraph.propTypes = {
    data: PropTypes.array // whatever `this.state.videos` is
};

import React, {Component} from "react";
import {VictoryLine, VictoryChart, VictoryTheme} from 'victory';
import '../styles/Home.scss';
import moment from 'moment';
import * as propTypes from 'prop-types';

const elem = (colour, string) => (
    <div key={string} style={{
        backgroundColor: {colour},
        width: 100,
        height: 100
    }}>
        {string}
    </div>
);

export default class Home extends Component {
    componentDidMount() {
        this.props.manualLoadGoals();
        this.props.manualLoadPreferences();
    }
    render() {
        return (
            <div id="home-container">
                <div id="home-content">
                    <h2>Home</h2>
                    <h4>{moment().format("ddd D MMMM")}</h4>
                    {
                        this.props.preferences.map((preference) => {
                            /*                                     "dataType": "HeartRate",
                             "colour":  DEFAULT_COLOUR,
                             "visualization": [],
                             */
                            return preference.visualization.map((visualization, i) => {
                                return (elem(preference.colour, visualization + " " + preference.dataType + " " + i));
                            });
                        })
                    }
                    {
                        this.props.goals.map((goal, i) => {
                            return (elem(goal.colour, goal.name + " " + goal.value + " " + i))
                        })
                    }
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    manualLoadGoals: propTypes.func.isRequired,
    manualLoadPreferences: propTypes.func.isRequired,
    manualLoadData: propTypes.func.isRequired,
    preferences: propTypes.array.isRequired,
    goals: propTypes.array.isRequired,
    data: propTypes.object.isRequired
};

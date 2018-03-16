import React, {Component} from "react";
import {VictoryLine, VictoryChart, VictoryTheme} from 'victory';
import '../styles/Home.scss';
import moment from 'moment';
import * as propTypes from 'prop-types';
import DashboardGrid from "./DashboardContainer";

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
        this.props.manualLoadPreferences().then(() => {
            this.props.preferences.map((p) => {
                p.visualization.map((v) => {
                    this.props.manualLoadData(p.dataType, this.mapToRange(v));

                })
            })
        });
    }

    mapToRange(visualization) {

        if (visualization.includes("Daily")) {
            return "Daily"
        }
        else if (visualization.includes("Weekly")) {
            return "Weekly";
        }
        else if (visualization.includes("Monthly")) {
            return "Monthly";
        }
        else if (visualization.includes("Annual")) {
            return "Annual";
        }
        return "Range is undefined";
    }

    render() {
        return (
            <div id="home-container" className="basic">
                  <div id="home-content__header">
                    <h2 className="home__title">Home</h2>
                    <h4 className="home__date">{moment().format("ddd D MMMM")}</h4>
                  </div>
                    {
                        this.props.preferences.length > 0 && (
                            <DashboardGrid preferences={ this.props.preferences } data={ this.props.data }
                                           loadDataToState={ this.props.manualLoadData }/> )
                    }
                    {
                    /* May No Longer Need This
                        this.props.preferences.map((preference) => {
                            *                                     "dataType": "HeartRate",
                             "colour":  DEFAULT_COLOUR,
                             "visualization": [],
                             *
                            return preference.visualization.map((visualization, i) => {
                                return (elem(preference.colour, visualization + " " + preference.dataType + " " + i));
                            });
                        })
                    */
                    }

                    <div id="goals-content__header">
                      <h2 className="goals__title">Goals</h2>
                    </div>
                    {
                        this.props.goals.length > 0 && ( <DashboardGrid goals = { this.props.goals } /> )
                        /* Might not need this anymore
                          this.props.goals.map((goal, i) => {
                            return (elem(goal.colour, JSON.stringify(goal)/* goal.name + " " + goal.value + " " + i*))
                        })
                        */
                    }
                    {
                        //JSON.stringify(this.props.data)
                    }
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
    data: propTypes.object.isRequired,
};

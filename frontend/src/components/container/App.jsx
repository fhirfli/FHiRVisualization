import React, { Component } from 'react';
import {any } from "prop-types";
import NavigationContainer from "./NavigationContainer";
import DashboardGrid from "./DashboardContainer";
import '../App.scss';

const dumbData = [
  {
    "dataType": "HeartRate",
    "colour": "red",
    "visualization": [
      "BarChartDaily",
      "LineGraphAnnual",
      "LineGraphWeekly"
    ]
  },
  {
    "dataType": "BloodPressure",
    "colour": "blue",
    "visualization": [
      "LineGraphAnnual",
      "BarGraphWeekly"
    ]
  }
];

export default class App extends Component {
    render() {
        return (
            <DashboardGrid preferences={dumbData} />
        );
    }
}

//<NavigationContainer />
//{this.props.children}


App.propTypes = {
    children: any
}

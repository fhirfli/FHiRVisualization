import React from 'react';
import ReactDOM from 'react-dom';
import Donut from "./visualizations/Donut"; //Will change this to a folder of visualizations components
import BarChart from "./visualizations/BarChart";
import GroupBarChart from "../corporate/visualizations/GroupBarChart";
import BrushLineGraph from "./visualizations/BrushLineGraph";
import GoalRing from "./visualizations/GoalRing";
import Clock from "./visualizations/Clock";

import * as PropTypes from 'prop-types';

const dateTypeToyLabelMap = {
    'BMI': 'BMI (kg/m^2)',
    'HeartRate': 'HeartRate (bpm)',
    'BloodPressure': 'Blood Pressure (mm)',
    'BodyWeight': 'Body Weight (kg)',
    'BodyHeight': 'Body Height (m)'
};


export default class DashboardGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {data: {}, goalData: {}, colour: {}, loadedCount: 0};
        this.loadDataToState = this.loadDataToState.bind(this);
        this.loadGoalData = this.loadGoalData.bind(this);
        this.checkVisType = this.checkVisType.bind(this);
        this.mapToRange = this.mapToRange.bind(this);
        this.renderVisualization = this.renderVisualization.bind(this);
        this.renderGoalvisualization = this.renderGoalvisualization.bind(this);
        this.loadGoals = this.loadGoals.bind(this);
        this.profileToDateValue = this.profileToDateValue.bind(this);
        this.dateValueListToCustomFormat = this.dateValueListToCustomFormat.bind(this);
        this.formatDaily = this.formatDaily.bind(this);
        this.formatWeekly = this.formatWeekly.bind(this);
    }

    // The data given is of type: { value, issued }
    // profileToDateValue() method converts this into a data set readable by Victory.js
    // visualization charts, accustom to the dataType and dataRange; an array of { x, y } objects
    profileToDateValue(preference) {
        let dateValueList = [];
        let dataList = this.props.data[preference.dataType][preference.dataRange];

        for (let i = 0; i < dataList.length; i++) {
            let value = dataList[i]["value"];
            let date = dataList[i]["issued"];
            dateValueList.push({value: value, date: date});
        }

        let formattedData = this.dateValueListToCustomFormat(dateValueList, preference.dataType, preference.dataRange);
        return ({data: formattedData});
    }


    // Converts an array of { date, value } objects to an array of:
    // { x, y } objects, accustom to the type of data and the range in which the data is recorded.
    dateValueListToCustomFormat(dateValueList, dataType, dataRange) {
        let listOfCustomFormats = [];
        if (dataType === "HeartRate") {
            if (dataRange === 'Daily') {
                listOfCustomFormats = this.formatDaily(dateValueList);
            }
            else if (dataRange === 'Weekly') {
                listOfCustomFormats = this.formatWeekly(dateValueList);
            }
        }

        else if (dataType === "BodyWeight") {
            if (dataRange === 'Daily') {
              listOfCustomFormats = this.formatDaily(dateValueList);
            }
            else if (dataRange === 'Weekly') {
              listOfCustomFormats = this.formatWeekly(dateValueList);
            }
        }

        else if (dataType === "BodyHeight") {
            if (dataRange === 'Daily') {
              listOfCustomFormats = this.formatDaily(dateValueList);
            }
            else if (dataRange === 'Weekly') {
                listOfCustomFormats = this.formatWeekly(dateValueList);
            }
        }

        else if (dataType === "BMI") {
            if (dataRange === 'Daily') {
              listOfCustomFormats = this.formatDaily(dateValueList);
            }
            else if (dataRange === 'Weekly') {
                listOfCustomFormats = this.formatWeekly(dateValueList);
            }
        }

        return listOfCustomFormats;
    }

    formatDaily(dateValueList) {
      // Formats data into a readable 'daily' customised array of { x, y } data
      let listOfCustomFormats = [];

      for (let i = 0; i < dateValueList.length; i++) {
          listOfCustomFormats.push({
              x: (new Date(dateValueList[i].date).getHours()),
              y: (Math.floor(dateValueList[i].value * 10) / 10)
          });
      }
      return listOfCustomFormats;
    }

    // Formats data into a readable 'Weekly' customised array of { x, y } data
    formatWeekly(dateValueList) {
      let listOfCustomFormats = new Array(7);
      let currentValue = dateValueList[0].value;
      let currentDay = new Date(dateValueList[0].date); // OF TYPE DATE

      // Iterate through the list of { date, value } objects and then get the max of each day
      // save that as: { x, y } then add to the new list of Custom Formats
      for (let i = 0; i < dateValueList.length; i++) {
          if (currentDay.getDay() == (new Date(dateValueList[i].date).getDay())) {
              currentValue = (currentValue < dateValueList[i].value) ? dateValueList[i].value : currentValue;
          }
          else {
              let formatted = {x: currentDay.getDate(), y: currentValue};
              listOfCustomFormats[currentDay.getDay()] = (formatted != null) ? formatted : {
                  x: currentDay.getDate(),
                  y: 0
              };
              currentDay = new Date(dateValueList[i].date);
              currentValue = 0;
          }
      }
      listOfCustomFormats[0] = (listOfCustomFormats[0].x > listOfCustomFormats[6].x) ? null : listOfCustomFormats[0];
      for (let index = 0; index < 7; index++) {
          listOfCustomFormats[index] = (listOfCustomFormats[index] === null) ? {
              x: "",
              y: 0
          } : listOfCustomFormats[index];
          listOfCustomFormats[index] = {
              x: listOfCustomFormats[index].x,
              y: Math.round(listOfCustomFormats[index].y * 10) / 10
          };
      }
      return listOfCustomFormats;
    }

    componentDidMount() {
        // Either props.preferences is null, OR props.goals is null
        if (this.props.preferences != null) {
            // EVERYTHING HAPPENS WITHIN THE ONE PROMISE BELOW.
            let listOfVisComponents = this.props.preferences.map((p) => {
                let dataType = p.dataType;
                return (
                    p.visualization.map((v) => {
                        let range = this.mapToRange(v);
                        return {dataRange: range, visualization: v, dataType: dataType, colour: p.colour};
                    })
                )
            });
            listOfVisComponents = [].concat.apply([], listOfVisComponents);

            let components = [];

            listOfVisComponents.map((vis) => {
                this.props.loadDataToState(vis.dataType, vis.dataRange).then(() => {

                    //console.log("LOAD DATA RETURNED OF" + vis.dataType + ", " + vis.dataRange + ", " + this.props.data[vis.dataType][vis.dataRange].length);

                    let count = this.state.loadedCount;
                    let formatted = this.profileToDateValue(vis);
                    components.push({
                        dataType: vis.dataType,
                        dataRange: vis.dataRange,
                        data: formatted.data,
                        visType: vis.visualization,
                        colour: vis.colour
                    });
                    //console.log("Added this: " + JSON.stringify({ dataType: dataType, dataRange: range, visType: v }));
                    this.loadDataToState(vis.dataType, vis.dataRange, formatted.data);
                    //this.loadColour(vis.colour);
                    this.setState({
                        listOfVisComponents: [...components],
                        loadedCount: count + 1
                    })
                });
            })
        }
        // we have to check whether  props.goals is null
        else {

            let listOfGoals = this.loadGoals();
            for (var i = 0; i < listOfGoals.length; i++) {
                let goal = listOfGoals[i].value;
                let title = listOfGoals[i].name;
                this.loadGoalData(title, goal);
            }

            this.setState({
                listOfGoals
            })
        }
    }

    // mapToRange takes in a given Visualzation spec: '{visualizationType}{dataRange}'
    // as a parameter, and returns a data range.
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
        return "Data given throws error: Unknown Range";
    }


    // checkVisType takes in a given Visualzation spec: '{visualizationType}{dataRange}'
    // and returns an int corresponding to the type of visualization
    checkVisType(visualization) {
        if (visualization.includes("BarChart")) {
          return 1;
        }
        else if (visualization.includes("LineGraph")) {
          return 2;
        }
        else if (visualization.includes("Doughnut")) {
          return 3;
        }
        else if (visualization.includes("Clock")) {
          return 4;
        }
        return 0;
    }

    // loadDataToState() takes: dataType, dataRange and an array of previously formatted data
    // and set
    loadDataToState(dataType, dataRange, formattedData) {
        var obj = Object.assign({}, this.state);
        obj.data = obj.data || {};
        obj.data[dataType] = obj.data[dataType] || {};
        obj.data[dataType][dataRange] = obj.data[dataType][dataRange] || {};
        obj.data[dataType][dataRange] = formattedData;

        this.setState(obj);
    }

    // Generates random goal data for a goal ring - Since we have no way of tracking the data
    // ManualLoadGoal() gets called on:
    loadGoalData(title, goal/*, current*/) {
        let current = Math.round(Number(goal - (Math.random() * goal)));
        const sampleGoalRing = [{x: current.toString(), y: current},
            {x: Math.round(Number(goal - current)).toString(), y: (goal - current)},
        ];

        var mock = Object.assign({}, this.state);
        mock.goalData = mock.goalData || {};
        mock.goalData[title] = mock.goalData[title] || {};
        mock.goalData[title] = sampleGoalRing;
        this.setState(mock);
    }


    // Returns a specific Visualisation for a given 'vis' object:
    // vis has a dataType, colour, and dataRange
    // Switches using the checkVisType() method to determine what type of visualization is preferred
    renderVisualization(vis) {
        switch (this.checkVisType(vis.visType)) {
            case 1:
                return (<BarChart key={ vis.dataRange + vis.dataType + this.checkVisType(vis.visType) }
                                  className="dash__component"
                                  ylabel={dateTypeToyLabelMap[vis.dataType]}
                                  data={ this.state.data[vis.dataType][vis.dataRange] } title={ vis.dataType }
                                  colour={ vis.colour } dataRange={ vis.dataRange }/>);
                break;
            case 2:
                return (<BrushLineGraph key={vis.dataRange + vis.dataType + this.checkVisType(vis.visType) }
                                        dataRange={ vis.dataRange } className="dash__component"
                                        ylabel={dateTypeToyLabelMap[vis.dataType]}
                                        data={ this.state.data[vis.dataType][vis.dataRange] } title={ vis.dataType }
                                        colour={ vis.colour }/>);
                break;
            case 3:
                return (<Donut key={vis.dataRange + vis.dataType + this.checkVisType(vis.visType) }
                               dataRange={ vis.dataRange } className="dash__component"
                               data={ this.state.data[vis.dataType][vis.dataRange] } title={ vis.dataType }
                               colour={ vis.colour }/>);
                break;
            case 4:
                // Note: clock only works for Daily dataRange
               return (<Clock key={vis.dataRange + vis.dataType + this.checkVisType(vis.visType) }
                                      dataRange={ vis.dataRange } className="dash__component"
                                      ylabel={dateTypeToyLabelMap[vis.dataType]}
                                      data={ this.state.data[vis.dataType][vis.dataRange] } title={ vis.dataType }
                                      colour={ vis.colour }/>);
               break;
            default:
                console.log("Unkown Data visualizations");
                break;
        }
    }

    // Returns a 'GoalRing' component given some specific goalData for a 'Title'
    renderGoalvisualization(name, goal) {
        return (<GoalRing key={goal + goal.name} className="dash__component" data={ this.state.goalData[name] }
                          title={ name } colour={ goal.colour }/> );
    }

    loadGoals() {
        // list of goal vis accumulates a list of goals
        const listOfGoalVis = [];
        this.props.goals.map((g) => {
            listOfGoalVis.push({name: g.name, value: g.value, colour: g.colour});
        });
        return listOfGoalVis;
    }

    // Checks whether to render a goal-only DashboardGrid
    // or a Visualisation DashboardGrid
    preferencesOrGoals() {
        if (this.props.preferences != null) {
            return (
              // Returns a Visualisation DashboardGrid
                <div className="dash__container">
                    {
                      // Check if this.state.listOfVisComponents is not empty,
                      // Check if the length of data loaded is greater than 1
                      // Then map over each visualization in the array of this.state.data
                      // that has an available dataset and render the visualization
                        this.state.listOfVisComponents &&
                        this.state.loadedCount > 0 &&
                        this.state.listOfVisComponents
                            .filter(vis => {
                                return this.state.data && this.state.data[vis.dataType] && this.state.data[vis.dataType][vis.dataRange] && this.state.data[vis.dataType][vis.dataRange].length > 0
                            })
                            .map(vis => {
                                return (this.renderVisualization(vis))
                            })
                    }
                </div>
            )
        }
        else {
            return (
              // Returns Goal-type DashboardGrid
                <div className="dash__container-goals">
                    {
                        // Check if this.state.listOfGoals is not empty, then map over each goal and render the goal
                        this.state.listOfGoals &&
                        this.state.listOfGoals.map(goal => this.renderGoalvisualization(goal.name, goal))
                    }
                </div>
            )
        }
    }

    render() {
        return (
          //Render
            <div>
                { this.preferencesOrGoals() }
            </div>
        )
    }
}

DashboardGrid.propTypes = {
    preferences: PropTypes.array,
    goals: PropTypes.array,
    data: PropTypes.any,
    loadDataToState: PropTypes.func
};

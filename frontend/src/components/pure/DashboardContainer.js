import React from 'react';
import ReactDOM from 'react-dom';
import Donut from "../Donut"; //Will change this to a folder of visualisation components
import BarChart from "../BarChart";
import GroupBarChart from "../GroupBarChart";
import LineGraph from "../LineGraph";
import BrushLineGraph from "../BrushLineGraph";
import GoalRing from "../GoalRing";

import * as PropTypes from 'prop-types';

export default class DashboardGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {data: {}, goalData: {}, colour: {}};
        this.loadData = this.loadData.bind(this);
        this.loadGoalData = this.loadGoalData.bind(this);
        this.checkVisType = this.checkVisType.bind(this);
        this.mapToRange = this.mapToRange.bind(this);
        this.renderVisualization = this.renderVisualization.bind(this);
        this.renderGoalVisualisation = this.renderGoalVisualisation.bind(this);
        this.loadGoals = this.loadGoals.bind(this);
        this.loadColour = this.loadColour.bind(this);
        this.profileToDateValue = this.profileToDateValue.bind(this);
        this.dateValueListToCustomFormat = this.dateValueListToCustomFormat.bind(this);
    }

    profileToDateValue(preference) {
      let dateValueList = [];

      let dataType = preference.dataType;
        const rangesAndVisType = []; // An array for storing objects of type: { range, vis };
      preference.visualization.map((v) => {
          let visType = v;
        let range = this.mapToRange(v);
        rangesAndVisType.push({ range: range, vis: visType });
        let dataList = this.props.data[dataType][range];
          for (let i = 0; i < dataList.length; i++) {
              let value = dataList[i]["value"];
              let date = dataList[i]["issued"];
              dateValueList.push({ value: value, date: date });
            }
      });

      let listOfVis = [];
      rangesAndVisType.map((obj) => {
        let formattedData = this.dateValueListToCustomFormat(dateValueList, dataType, obj.range);
        listOfVis.push({ dataType: dataType, dataRange: obj.range, data: formattedData, visType: obj.vis });
      });

      return listOfVis;
    }

    dateValueListToCustomFormat(dateValueList, dataType, dataRange) {
      //console.log("DATA YEET: " + dateValueList);

      if(dataType === "HeartRate") {
          if (dataRange === 'Daily') {
          var listOfCustomFormats = [];

          for(var i = 0; i < dateValueList.length; i++) {
            listOfCustomFormats.push({ x: (new Date(dateValueList[i].date).getDate()), y: dateValueList[i].value });
          }
        }
      }

      else if(dataType === "BodyWeight") {
        if(dataRange == 'Weekly') {
          var listOfCustomFormats = new Array(7);
          var currentValue = dateValueList[0].value;
          var currentDay = new Date(dateValueList[0].date); // OF TYPE DATE

          for(var i = 0; i < dateValueList.length; i++) {
            if(currentDay.getDay() == (new Date(dateValueList[i].date).getDay())) {
              currentValue = (currentValue < dateValueList[i].value) ? dateValueList[i].value : currentValue;
            }
            else {
              let formatted = { x: currentDay.getDate(), y: currentValue };
              listOfCustomFormats[currentDay.getDay()] = (formatted != null) ? formatted : { x: currentDay.getDate(), y: 0 } ;
              currentDay = new Date(dateValueList[i].date);
              currentValue = 0;
            }
          }
          listOfCustomFormats[0] = (listOfCustomFormats[0].x > listOfCustomFormats[6].x) ? null : listOfCustomFormats[0];
          for(var index = 0; index < 7; index++) {
            listOfCustomFormats[index] = (listOfCustomFormats[index] == null) ? { x: "", y: 0 } : listOfCustomFormats[index];
          }
        }
      }

      else if(dataType === "BodyHeight") { //This honestly makes no sense to measure
        if(dataRange == 'Weekly') {
          var listOfCustomFormats = new Array(7);
          var currentValue = dateValueList[0].value;
          var currentDay = new Date(dateValueList[0].date); // OF TYPE DATE

          for(var i = 0; i < dateValueList.length; i++) {
            if(currentDay.getDay() == (new Date(dateValueList[i].date).getDay())) {
              currentValue = (currentValue < dateValueList[i].value) ? dateValueList[i].value : currentValue;
            }
            else {
              let formatted = { x: currentDay.getDate(), y: currentValue };
              listOfCustomFormats[currentDay.getDay()] = (formatted != null) ? formatted : { x: currentDay.getDate(), y: 0 } ;
              currentDay = new Date(dateValueList[i].date);
              currentValue = 0;
            }
          }
          listOfCustomFormats[0] = (listOfCustomFormats[0].x > listOfCustomFormats[6].x) ? null : listOfCustomFormats[0];
          for(var index = 0; index < 7; index++) {
            listOfCustomFormats[index] = (listOfCustomFormats[index] == null) ? { x: "", y: 0 } : listOfCustomFormats[index];
          }
        }
      }

      else if(dataType === "BMI") {
        if(dataRange == 'Weekly') {
          var listOfCustomFormats = new Array(7);
          var currentValue = dateValueList[0].value;
          var currentDay = new Date(dateValueList[0].date); // OF TYPE DATE

          for(var i = 0; i < dateValueList.length; i++) {
            if(currentDay.getDay() == (new Date(dateValueList[i].date).getDay())) {
              currentValue = (currentValue < dateValueList[i].value) ? dateValueList[i].value : currentValue;
            }
            else {
              let formatted = { x: currentDay.getDate(), y: currentValue };
              listOfCustomFormats[currentDay.getDay()] = (formatted != null) ? formatted : { x: currentDay.getDate(), y: 0 } ;
              currentDay = new Date(dateValueList[i].date);
              currentValue = 0;
            }
          }
          listOfCustomFormats[0] = (listOfCustomFormats[0].x > listOfCustomFormats[6].x) ? null : listOfCustomFormats[0];
          for(var index = 0; index < 7; index++) {
            listOfCustomFormats[index] = (listOfCustomFormats[index] == null) ? { x: "", y: 0 } : listOfCustomFormats[index];
          }
        }
      }

      return listOfCustomFormats;
    }

    componentDidMount() {
        // We have to check whether props.preferences is null,
        if (this.props.preferences) {
            // list of vis components is a list of items that will accumulate objects of the following form
            // (dataType, dataRange, data,visualizationType, colour)
          let listOfVisComponents = [];
            this.props.preferences.map((p) => {
              let dataType = p.dataType;
              p.visualization.map((v) => {
                let range = this.mapToRange(v);
                this.props.loadData(dataType, range).then(() => {
                  let listOfVis = this.profileToDateValue(p);
                    for (let i = 0; i < listOfVis.length; i++) {
                    listOfVisComponents.push({ dataType: dataType, dataRange: range, data: listOfVis[i].data, visType: v, colour: p.colour });
                    this.loadData(dataType, range, listOfVis[i].data);
                    this.loadColour(p.colour);
                  }
                  this.setState({
                    listOfVisComponents
                  })
                });
              })
            });
        }
        // we have to check whether  props.goals is null
        else /*(this.props.goals !== null)*/{

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
        return "OOPS";
    }

    // LOAD COLOURS:
    loadColour(colour) {
        if (colour.includes("blue")) {
            const blue = "#76bbf1";

            var mock = Object.assign({}, this.state);
            mock.colour = mock.colour || {};
            mock.colour[colour] = mock.colour[colour] || {};
            mock.colour[colour] = blue;
        }
        else if (colour.includes("red")) {
            const red = "#ec5229";

            var mock = Object.assign({}, this.state);
            mock.colour = mock.colour || {};
            mock.colour[colour] = mock.colour[colour] || {};
            mock.colour[colour] = red;
        }
        else if (colour.includes("yellow")) {
            const yellow = "#fcee5f";

            var mock = Object.assign({}, this.state);
            mock.colour = mock.colour || {};
            mock.colour[colour] = mock.colour[colour] || {};
            mock.colour[colour] = yellow;
        }
        else if (colour.includes("green")) {
            const green = "#69da60";

            var mock = Object.assign({}, this.state);
            mock.colour = mock.colour || {};
            mock.colour[colour] = mock.colour[colour] || {};
            mock.colour[colour] = green;
        }
    }

    checkVisType(vis) { // Ammendable visualisation checker
        if (vis.includes("BarChart")) {
            return 1;
        }
        else if (vis.includes("LineGraph")) {
            return 2;
        }
        else if (vis.includes("Doughnut")) {
            return 3;
        }
        else if (vis.includes("GroupBarChart")) {
            return 4;
        }
        return 0;
    }

    //Save Data to State
    loadData(dataType, dataRange, formattedData) {
        var obj = Object.assign({}, this.state);
        obj.data = obj.data || {};
        obj.data[dataType] = obj.data[dataType] || {};
        obj.data[dataType][dataRange] = obj.data[dataType][dataRange] || {};
        obj.data[dataType][dataRange] = formattedData;

        this.setState(obj);
    }

    //Find Goals
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

    renderVisualization(vis) {
        console.log("RENDER VIS: " + JSON.stringify(vis));
        switch (this.checkVisType(vis.visType)) {
            case 1:
                return (<BarChart key={ vis.dataRange + vis.dataType + this.checkVisType(vis.visType) } className="dash__component"
                                  data={ vis.data } title={ vis.dataType } colour={ this.state.colour[vis.colour] } />);
                break;
            case 2:
                return (<BrushLineGraph key={vis.dataRange + vis.dataType + this.checkVisType(vis.visType) } className="dash__component"
                                        data={ vis.data } title={ vis.dataType }  colour={ this.state.colour[vis.colour] } />);
                break;
            case 3:
                return (<Donut key={vis.dataRange + vis.dataType + this.checkVisType(vis.visType) } className="dash__component"
                               data={ vis.data } title={ vis.dataType } colour={ this.state.colour[vis.colour] } />);
                break;
            case 4:
                return (<GroupBarChart key={vis.dataRange + vis.dataType + this.checkVisType(vis.visType) } className="dash__component"
                                       data={ vis.data } title={ vis.dataType } colour={ this.state.colour[vis.colour] } />);
                break;
            default:
                console.log("Unkown Data visualisation");
                break;
        }
    }

    renderGoalVisualisation(name, goal) {
        return (<GoalRing key={goal + goal.name} className="dash__component" data={ this.state.goalData[name] }
                          title={ name }/> );
    }

    loadGoals() {
        // list of goal vis accumulates a list of goals
        const listOfGoalVis = [];
        this.props.goals.map((g) => {
            listOfGoalVis.push({name: g.name, value: g.value, colour: g.colour});
        });
        return listOfGoalVis;
    }

    preferencesOrGoals() {
        if (this.props.preferences != null) {
            return (
                <div className="dash__container">
                    {
                        this.state.listOfVisComponents &&
                        this.state.listOfVisComponents.map(vis => this.renderVisualization(vis))
                    }
                </div>
            )
        }
        else {
            return (
                <div className="dash__container-goals">
                    {
                      this.state.listOfGoals &&
                      this.state.listOfGoals.map(goal => this.renderGoalVisualisation(goal.name, goal))
                    }
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                { this.preferencesOrGoals() }
            </div>
            /*
             <div className="dash__container">
             {
             (this.state.listOfVis &&
             this.state.listOfVis.map(vis => this.renderVisualization(vis))) ||
             (this.state.listOfGoals && this.state.listOfGoals.map(vis => this.renderGoalVisualisation(vis)))
             }
             </div>
             */
        )
    }
}

DashboardGrid.propTypes = {
    preferences: PropTypes.array,
    goals: PropTypes.array,
    data: PropTypes.any,
    loadData: PropTypes.func
};

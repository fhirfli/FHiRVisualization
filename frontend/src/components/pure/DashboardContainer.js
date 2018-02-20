import React from 'react';
import ReactDOM from 'react-dom';
import Donut from "../Donut"; //Will change this to a folder of visualization components
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
        this.renderGoalvisualization = this.renderGoalvisualization.bind(this);
        this.loadGoals = this.loadGoals.bind(this);
        this.loadColour = this.loadColour.bind(this);
        this.profileToDateValue = this.profileToDateValue.bind(this);
        this.dateValueListToCustomFormat = this.dateValueListToCustomFormat.bind(this);
    }

    profileToDateValue(preference) {
      let dateValueList = [];
      let dataList = this.props.data[preference.dataType][preference.dataRange];
      for(var i = 0; i < dataList.length; i++) {
            let value = dataList[i]["value"];
            let date = dataList[i]["issued"];
            dateValueList.push({ value: value, date: date });
          }

      let formattedData = this.dateValueListToCustomFormat(dateValueList, preference.dataType, preference.dataRange);
      return ({ data: formattedData });
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
            listOfCustomFormats[index] = { x: listOfCustomFormats[index].x, y: Math.round(listOfCustomFormats[index].y * 10) / 10} ;
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
            listOfCustomFormats[index] = { x: listOfCustomFormats[index].x, y: Math.round(listOfCustomFormats[index].y * 10) / 10} ;
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
            listOfCustomFormats[index] = { x: listOfCustomFormats[index].x, y: Math.round(listOfCustomFormats[index].y * 10) / 10} ;
          }
        }
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
                    return { dataRange: range, visualization: v, dataType: dataType, colour: p.colour };
                  })
              )
            });
            listOfVisComponents = [].concat.apply([], listOfVisComponents);

            console.log("listOfVisComponents in componentDidMount(): " + JSON.stringify(listOfVisComponents));

            let components = [];

            listOfVisComponents.map((vis) => {
              this.props.loadData(vis.dataType, vis.dataRange).then(() => {

                let formatted = this.profileToDateValue(vis);
                components.push({ dataType: vis.dataType, dataRange: vis.dataRange, data: formatted.data, visType: vis.visualization, colour: vis.colour });
                console.log("pushing: " + vis.visualization);
                  //console.log("Added this: " + JSON.stringify({ dataType: dataType, dataRange: range, visType: v }));
                this.loadData(vis.dataType, vis.dataRange, formatted.data);
                this.loadColour(vis.colour);
                this.setState({
                  listOfVisComponents:[...components]
                })
              });
              console.log("this.state.data: " + JSON.stringify(this.state.listOfVisComponents));
            })
        }
        // we have to check whether  props.goals is null
        else {

            let listOfGoals = this.loadGoals();
            console.log("GOALS: " + JSON.stringify(listOfGoals));
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

    checkVisType(vis) { // Ammendable visualization checker
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
                                  data={ this.state.data[vis.dataType][vis.dataRange] } title={ vis.dataType } colour={ this.state.colour[vis.colour] } dataRange={ vis.dataRange } />);
                break;
            case 2:
                return (<BrushLineGraph key={vis.dataRange + vis.dataType + this.checkVisType(vis.visType) } dataRange={ vis.dataRange } className="dash__component"
                                        data={ this.state.data[vis.dataType][vis.dataRange] } title={ vis.dataType }  colour={ this.state.colour[vis.colour] } />);
                break;
            case 3:
                return (<Donut key={vis.dataRange + vis.dataType + this.checkVisType(vis.visType) } dataRange={ vis.dataRange } className="dash__component"
                               data={ this.state.data[vis.dataType][vis.dataRange] } title={ vis.dataType } colour={ vis.colour } />);
                break;
            case 4:
                return (<GroupBarChart key={vis.dataRange + vis.dataType + this.checkVisType(vis.visType) } dataRange={ vis.dataRange } className="dash__component"
                                       data={ this.state.data[vis.dataType][vis.dataRange] } title={ vis.dataType } colour={ this.state.colour[vis.colour] } />);
                break;
            default:
                console.log("Unkown Data visualization");
                break;
        }
    }

    renderGoalvisualization(name, goal) {
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
                        this.state.listOfVisComponents.map(vis => { console.log("listOfVisComponents.map(vis): " + JSON.stringify(vis)); return (this.renderVisualization(vis))})
                    }
                </div>
            )
        }
        else {
            return (
                <div className="dash__container-goals">
                    {
                      this.state.listOfGoals &&
                      this.state.listOfGoals.map(goal => this.renderGoalvisualization(goal.name, goal))
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
             (this.state.listOfGoals && this.state.listOfGoals.map(vis => this.renderGoalvisualization(vis)))
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

import React from 'react';
import ReactDOM from 'react-dom';
import Donut from "../Donut"; //Will change this to a folder of visualisation components
import BarChart from "../BarChart";
import GroupBarChart from "../GroupBarChart";
import LineGraph from "../LineGraph";
import BrushLineGraph from "../BrushLineGraph";

import * as PropTypes from 'prop-types';

export default class DashboardGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = { data : {} };
    this.loadData = this.loadData.bind(this);
    this.checkVisType  = this.checkVisType.bind(this);
    this.mapToRange  = this.mapToRange.bind(this);
    this.renderVisualization  = this.renderVisualization.bind(this);
    this.loadPreferences  = this.loadPreferences.bind(this);
  }

  componentDidMount() {
    //Initialise data here?
    let listOfVis = this.loadPreferences();
    for(var i = 0; i < listOfVis.length; i++) {
      let dataRange = this.mapToRange(listOfVis[i].visualization);
      let dataType = listOfVis[i].dataType;
      this.loadData(dataType, dataRange);
    }

    this.setState({
      listOfVis
    })
    console.log("DAshboardContainer : " + JSON.stringify(this.props.preferences));
  }

  mapToRange(visualization) {
    if(visualization.includes("Daily")) { return "Daily" }
    else if(visualization.includes("Weekly")) { return "Weekly"; }
    else if(visualization.includes("Monthly")) { return "Monthly"; }
    else if(visualization.includes("Annual")) { return "Annual"; }
    return "OOPS";
  }

  checkVisType(vis) { // Ammendable visualisation checker
    console.log(JSON.stringify(vis));
    if(vis.visualization.includes("BarChart")) {
      return 1;
    }
    else if(vis.visualization.includes("LineGraph")) {
      return 2;
    }
    else if(vis.visualization.includes("Doughnut")) {
      return 3;
    }
    else if(vis.visualization.includes("GroupBarChart")) {
      return 4;
    }
    return 0;
  }

  // Find preference,
  // manualLoadData() gets called on: dataType & range (Weekly, Monthly etc)

  // Load the data from Props
  loadData(dataType, dataRange) {
    const sampleBarChartWeekly1 = [{ x: "Monday", y: (Math.random() * 400), label: "Monday"},
                                 { x: "Tuesday", y: (Math.random() * 400), label: "Tuesday" },
                                 { x: "Wednesday", y: (Math.random() * 400), label: "Wednesday" },
                                 { x: "Thursday", y: (Math.random() * 400), label: "Thursday" },
                                 { x: "Friday", y: (Math.random() * 400), label: "Friday" },
                                 { x: "Saturday", y: (Math.random() * 400), label: "Saturday" },
                                 { x: "Sunday", y: (Math.random() * 400), label: "Sunday" }
                               ];

    var mock = Object.assign({}, this.state);
    mock.data = mock.data || {};
    mock.data[dataType] = mock.data[dataType] || {};
    mock.data[dataType][dataRange] = mock.data[dataType][dataRange] || {};
    mock.data[dataType][dataRange] = sampleBarChartWeekly1;

    this.setState(mock);
  }

  renderVisualization(vis) {
    let dataRange = this.mapToRange(vis.visualization);
    let dataType = vis.dataType;
    switch(this.checkVisType(vis)) {
      case 1:
        return( <BarChart key={dataRange+dataType} className="dash__component" data={ this.state.data[dataType][dataRange] } />);
        break;
      case 2:
        return( <BrushLineGraph key={dataRange+dataType} className="dash__component" data={ this.state.data[dataType][dataRange] } />);
        break;
      case 3:
        return( <Donut key={dataRange+dataType} className="dash__component" data={ this.state.data[dataType][dataRange] } />);
        break;
      case 4:
        return( <GroupBarChart key={dataRange+dataType} className="dash__component" data={ this.state.data[dataType][dataRange] } />);
        break;
      default:
        console.log("Unkown Data visualisation");
        break;
    }
  }

  loadPreferences() {
    var listOfVis = [];
    this.props.preferences.map((p) => {
      console.log(JSON.stringify(p))
      p.visualization.map((v) => {
        listOfVis.push({dataType : p.dataType, visualization : v, colour: p.colour});
      })
    })
    return listOfVis;
  }

  render() {
    return (
      <div className="dash__container">
        { this.state.listOfVis &&
          this.state.listOfVis.map(vis => this.renderVisualization(vis))
        }
      </div>
    )
  }
}

DashboardGrid.propTypes = {
  preferences: PropTypes.array // whatever `this.state.videos` is
};

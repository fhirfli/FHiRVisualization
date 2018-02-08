import React from 'react';
import ReactDOM from 'react-dom';
import Donut from "../Donut"; //Will change this to a folder of visualisation components
import BarChart from "../BarChart";
import GroupBarChart from "../GroupBarChart";
import LineGraph from "../LineGraph";
import BrushLineGraph from "../BrushLineGraph";

import * as PropTypes from 'prop-types';

export default class CorporateDashboardGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = { data : {}, goalData : {} };
    this.loadData = this.loadData.bind(this);
    this.checkVisType  = this.checkVisType.bind(this);
    this.renderVisualization  = this.renderVisualization.bind(this);
    this.loadPreferences  = this.loadPreferences.bind(this);
  }

  componentDidMount() {
    // Either props.preferences is null, OR props.goals is null
    let listOfVis = this.loadPreferences();
    for(var i = 0; i < listOfVis.length; i++) {
      let dataType = listOfVis[i].mainDataType;
      this.loadData(dataType);
    }

    this.setState({
      listOfVis
    })
  }

  checkVisType(vis) { // Ammendable visualisation checker
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
  loadData(dataType) {
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
    mock.data[dataType] = sampleBarChartWeekly1;

    this.setState(mock);
  }

  renderVisualization(vis) {
    console.log(JSON.stringify(vis));
    let dataType = vis.dataType;
    switch(this.checkVisType(vis)) {
      case 1:
        return( <BarChart key={dataType} className="dash__component" data={ this.state.data[dataType] } title={ dataType } />);
        break;
      case 2:
        return( <BrushLineGraph key={dataType} className="dash__component" data={ this.state.data[dataType] } title={ dataType } />);
        break;
      case 3:
        return( <Donut key={dataType} className="dash__component" data={ this.state.data[dataType] } title={ dataType } />);
        break;
      case 4:
        return( <GroupBarChart key={dataType} className="dash__component" data={ this.state.data[dataType] } title={ dataType } />);
        break;
      default:
        console.log("Unkown Data visualisation");
        break;
    }
  }

  loadPreferences() {
    var listOfVis = [];
    console.log("LOAD PREFERENCES: " + JSON.stringify(this.props.preferences));
    this.props.preferences.map((p) => {
      listOfVis.push({dataType : p.mainDataType, visualization : p.visualization, colour: p.colour });
      /* I think this requires p.visualization to be an array
      p.visualization.map((v) => {
        listOfVis.push({dataType : p.mainDataType, visualization : v, colour: p.colour });
      })*/
    })
    console.log("listOfVis: " + listOfVis);
    return listOfVis;
  }

  render() {
    return (
      <div className="dash__container">
        {
          this.state.listOfVis &&
          this.state.listOfVis.map(vis => this.renderVisualization(vis))
        }
      </div>
    )
  }
}

CorporateDashboardGrid.propTypes = {
  preferences: PropTypes.array,
};

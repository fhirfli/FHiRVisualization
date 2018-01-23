import React from 'react';
import ReactDOM from 'react-dom';
import Donut from "../Donut"; //Will change this to a folder of visualisation components
import BarChart from "../BarChart";
import GroupBarChart from "../GroupBarChart";
import LineGraph from "../LineGraph";
import BrushLineGraph from "../BrushLineGraph";

import * as PropTypes from 'prop-types';

const sampleData = [{x: "Calories Burnt", y: 293},
    {x: "Calories To Burn", y: 424},];

export default class DashboardGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {data: {}};

        this.loadData = this.loadData.bind(this);
        this.checkVisType = this.checkVisType.bind(this);
        this.mapToRange = this.mapToRange.bind(this);
        this.renderVisualization = this.renderVisualization.bind(this);
        this.loadPreferences = this.loadPreferences.bind(this);
    }

    componentDidMount() {
        //Initialise data here?
        let listOfVis = this.loadPreferences();
        for (var i = 0; i < listOfVis.length; i++) {
            let dataRange = this.mapToRange(listOfVis[i].visualization);
            let dataType = listOfVis[i].dataType;
            this.loadData(dataType, dataRange);
        }

        this.setState({
            listOfVis
        })
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

    checkVisType(vis) { // Ammendable visualisation checker
        console.log(JSON.stringify(vis));
        if (vis.visualization.includes("BarChart")) {
            return 1;
        }
        else if (vis.visualization.includes("LineGraph")) {
            return 2;
        }
        else if (vis.visualization.includes("Donut")) {
            return 3;
        }
        else if (vis.visualization.includes("GroupBarChart")) {
            return 4;
        }
        return 0;
    }

    // Find preference,
    // manualLoadData() gets called on: dataType & range (Weekly, Monthly etc)

    // Load the data from Props
    loadData(dataType, dataRange) {
        const sampleData = [{x: "Calories Burnt", y: 293},
            {x: "Calories To Burn", y: 424}
        ];

        var mock = Object.assign({}, this.state);
        mock.data = mock.data || {};
        mock.data[dataType] = mock.data[dataType] || {};
        mock.data[dataType][dataRange] = mock.data[dataType][dataRange] || {};
        mock.data[dataType][dataRange] = sampleData;

        this.setState(mock);
    }

    renderVisualization(vis) {
        let dataRange = this.mapToRange(vis.visualization);
        let dataType = vis.dataType;
        switch (this.checkVisType(vis)) {
            case 1:
                return ( <BarChart key={dataRange + dataType} data={ this.state.data[dataType][dataRange] }/>);
                break;
            case 2:
                return ( <BrushLineGraph key={dataRange + dataType} data={ this.state.data[dataType][dataRange] }/>);
                break;
            case 3:
                return ( <Donut key={dataRange + dataType} data={ this.state.data[dataType][dataRange] }/>);
                break;
            case 4:
                return ( <GroupBarChart key={dataRange + dataType} data={ this.state.data[dataType][dataRange] }/>);
                break;
            default:
                console.log("Unkown Data visualisation");
                break;
        }
    }


    /* Convert to CSS grid divs:
     populate(listOfVis) {
     if (!listOfVis) {
     return [];
     }
     var components = [];
     for(var i = 0; i < listOfVis.length; i++) {
     renderVisualization(listOfVis[i])
     /*let dataRange = this.mapToRange(listOfVis[i].visualization);
     let dataType = listOfVis[i].dataType;
     switch(this.checkVisType(listOfVis[i])) {
     case 1:
     components.push( <BarChart key={i+dataRange+dataType} data={ this.state.data[dataType][dataRange] } />);
     break;
     case 2:
     components.push( <BrushLineGraph key={i+dataRange+dataType} data={ this.state.data[dataType][dataRange] } />);
     break;
     case 3:
     components.push( <Donut key={i+dataRange+dataType} data={ this.state.data[dataType][dataRange] } />);
     break;
     case 4:
     components.push( <GroupBarChart key={i+dataRange+dataType} data={ this.state.data[dataType][dataRange] } />);
     break;
     default:
     console.log("Unkown Data visualisation");
     break;
     }
     *
     }
     return components;
     }
     */

    loadPreferences() {
        var listOfVis = [];
        this.props.preferences.map((p) => {
            p.visualization.map((v) => {
                listOfVis.push({dataType: p.dataType, visualization: v});
            })
        });
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

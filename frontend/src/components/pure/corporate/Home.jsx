import React, {Component} from "react";
import {VictoryLine, VictoryChart, VictoryTheme} from 'victory';
import '../styles/Home.scss';
import moment from 'moment';
import * as propTypes from 'prop-types';
import CorporateDashboardGrid from "../DashboardContainerCorporate";

const elem = (text) => (
    <div style={{
        backgroundColor: 'red',
        width: 100,
        height: 100
    }}>
        {text}
    </div>
);

export default class Home extends Component {
    componentDidMount() {
        this.props.manualLoadPreferences().then(() => this.loadData());
        //this.props.manualLoadData('HeartRate');
        //this.props.manualLoadData('HeartRate', 'BMI');
        console.log("PREFERENCES: " + JSON.stringify(this.props.preferences));
    }

    loadData() {
      for(var i = 0; i < this.props.preferences.length; i++) {
        let preference = this.props.preferences[i];
        console.log("current preference: " + JSON.stringify(preference));
          if (preference.secondaryDataType != null) {
              this.props.manualLoadData(preference.mainDataType, preference.secondaryDataType);
          }
          else {
              this.props.manualLoadData(preference.mainDataType);
          }
      }
    }

    formatDataForTwo(mainDataType, secondaryDataType) {
      return new Promise((resolve, reject)=> {
        console.log("FORMAT DATA FOR 2: " + JSON.stringify(this.props.data[mainDataType][secondaryDataType]));
        let values = this.props.data[mainDataType][secondaryDataType].map((xy) => {
            return( { x: xy.valueA, y: xy.valueB } );
            });
        console.log("FORMATTED DATA FOR 2 (BEFORE RETURN): " + JSON.stringify(values));
        resolve(values);
      });
    }

    formatDataForOne(mainDataType) {
      console.log("FORMAT DATA FOR 1: " + JSON.stringify(this.props.data[mainDataType].self));
      let values = this.props.data[mainDataType].self.map((value, index) => {
          return( { x: index, y: value.value } );
        });
      console.log("FORMATTED DATA FOR 1 (BEFORE RETURN): " + JSON.stringify(values));
      return values;
    }

    render() {
    console.log("PREFERENCES HOME: " + JSON.stringify(this.props.preferences));
        return (
            <div id="home-container">
                <div id="home-content">
                    <h2 className="home__title">Home</h2>
                    <h4 className="home__date">{moment().format("ddd D MMMM")}</h4>
                    {
                        this.props.preferences.length > 0 && Object.keys(this.props.data) > 0 && ( <CorporateDashboardGrid preferences={ this.props.preferences } data={ this.props.data } loadData={ this.props.manualLoadData }/> )

                        /*this.props.preferences.map(preference => {
                            return elem(preference.mainDataType + " " + preference.secondaryDataType + " " + preference.colour);
                        })*/
                    }
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    preferences: propTypes.array,
    data: propTypes.object,
    manualLoadPreferences: propTypes.func,
    manualLoadData: propTypes.func
};

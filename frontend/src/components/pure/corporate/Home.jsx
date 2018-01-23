import React, {Component} from "react";
import {VictoryLine, VictoryChart, VictoryTheme} from 'victory';
import '../styles/Home.scss';
import moment from 'moment';

const elem = () => (
    <div style={{
        backgroundColor: 'red',
        width: 100,
        height: 100
    }}>
        Data
    </div>
);

export default class Home extends Component {
    render() {
        return (
            <div id="home-container">
                <div id="home-content">
                    <h2>Home</h2>
                    <h4>{moment().format("ddd D MMMM")}</h4>
                    {elem()}
                    {elem()}
                    {elem()}
                </div>
            </div>
        );
    }
}

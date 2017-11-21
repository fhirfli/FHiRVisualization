import React, { Component } from 'react';
import './App.scss';
import { render } from 'react-dom';
import { VictoryPie } from 'victory';

class PieChart extends Component {
    render() {
      return (
        <VictoryPie />
      );
    }
  }
  

export default class App extends Component {
    render() {
        return (
            <PieChart/>
        );
    }
}


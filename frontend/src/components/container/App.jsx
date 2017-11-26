import React, { Component } from 'react';
import {any } from "prop-types";
import NavigationContainer from "./NavigationContainer";

export default class App extends Component {
    render(){
        return (
            <div>
                <NavigationContainer />
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: any
}
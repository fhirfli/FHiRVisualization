import React, {Component} from "react";
import '../styles/Goals.scss';

const elem = () => (
    <div style={{
        backgroundColor: 'red',
        width: 100,
        height: 100
    }}>
        Data
    </div>
);

export default class Goals extends Component {
    render() {
        return (
            <div id="goals-container">
                <div id="goals-content">
                    <h2>Goals</h2>
                    <h4>This is where you might be able to select goals</h4>
                </div>
            </div>
        );
    }
}

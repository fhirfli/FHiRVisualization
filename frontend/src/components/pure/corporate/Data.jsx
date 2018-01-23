import React, {Component} from "react";
import '../styles/Data.scss';

const elem = () => (
    <div style={{
        backgroundColor: 'red',
        width: 100,
        height: 100
    }}>
        Data
    </div>
);

export default class Data extends Component {
    render() {
        return (
            <div id="data-container">
                <div id="data-content">
                    <h2>Data</h2>
                    <h4>Here is where you would be able to view all your data</h4>
                </div>
            </div>
        );
    }
}

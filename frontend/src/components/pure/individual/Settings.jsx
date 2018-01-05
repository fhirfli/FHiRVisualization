import React, {Component} from "react";
import '../styles/Settings.scss';

const elem = () => (
    <div style={{
        backgroundColor: 'red',
        width: 100,
        height: 100
    }}>
        Data
    </div>
);

export default class Settings extends Component {
    render() {
        return (
            <div id="settings-container">
                <div id="settings-content">
                    <h2>Settings</h2>
                    <h4>This is where you would be able to store your settings</h4>
                </div>
            </div>
        );
    }
}

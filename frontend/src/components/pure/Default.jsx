import React, { Component } from "react";
import './styles/Default.scss';

export default class Default extends Component {
    render() {
        return (
            <div id="about-container">
                <div id="about-content">
                    <h2>FHiR Visualization</h2>
                    <p>A Health Dashboard for the People, by the People!</p>
                    <p>Features:</p>
                    <ul>
                        <li id="bttn"><strong>Fast</strong></li>
                        <li id="bttn"><strong>Furious</strong></li>
                        <li id="bttn"><strong>Fancy</strong></li>
                        <li id="bttn"><strong>Free?</strong></li>
                    </ul>
                </div>
            </div>
        );
    }
}
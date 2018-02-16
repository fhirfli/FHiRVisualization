import React, { Component } from "react";
import './styles/Default.scss';

export default class Default extends Component {
    render() {
        return (
            <div>
            <img id="image" src={require("../../images/masthead.png")}/>
            
            <div id="banner">
                <h2>A new way to track your health</h2>
                <br></br>
                <p>Use <strong>FHiR</strong> Visualization to provide a unified platform for all your health data.</p>
                <p><strong>Corporate and Individual Data Visualization using a FHiR format</strong></p>
                <p>To get started, log in using the respective Login Portal</p>
            </div>

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
</div>
        );
    }
}
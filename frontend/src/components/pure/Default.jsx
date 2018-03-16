import React, { Component } from "react";
import { Link } from "react-router";
import './styles/Default.scss';

export default class Default extends Component {
    render() {
        return (
            <div>
                <div className="containerr">
                    <img id="image" src={require("../../images/masthead.png")} />

                    <div id="centered">
                        <h2>A new way to track your health</h2>
                        <br></br>
                        <p>Use <strong>FHiR</strong> Visualization to provide a unified platform for all your health data.</p>
                        <p><strong>Corporate and Individual Data Visualization using a FHiR format</strong></p>
                        <p>To get started, log in using the respective Login Portal</p>
                    </div>
                </div>
                <div id="about-container">
                    <div id="about-content">
                        <img src={require("../../images/graph.png")} />
                        <div style={{marginLeft: "20px", width: "300px"}}>
                            <h2 style={{marginTop: "0px"}}>Corporate Data Reporting</h2>
                            <p>Use FHiR Visualisation to provide detailed visualisations on annonymised health data for employees registered with your company</p>
                            <Link to="/corporate/login">Go To Corporate Sign In</Link>
                        </div>
                        <img style={{marginLeft: "20px"}} src={require("../../images/intersection.png")} />
                        <div style={{marginLeft: "20px", width: "330px"}}>
                            <h2 style={{marginTop: "0px"}}>Personal Health Dashboard</h2>
                            <p>FHiR Visualization can aggregate your wearable data into a single platform under a medical format, allowing you to easily share that data with clinicians</p>
                            <Link to="/individual/login">Go To Individual Sign In</Link>
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}
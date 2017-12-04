import React, { Component } from "react";
import { Link } from "react-router";
import { any } from "prop-types";

var navStyle = {
    backgroundColor: "#EEE",
    padding: "10px"
};


var buttonStyle = {
    backgroundColor: "yellow"
}


export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this._logout = this._logout.bind(this);
    }

    _logout(event) {
        event.preventDefault();
        this.props.manualLogout();
    }

    render() {
        return (
            <div style={navStyle}>
                {
                    this.props.user.authenticated
                    ? <button onClick={this._logout} style={buttonStyle}>Logout [{this.props.user.username}]</button>
                    : <Link to="/login">Log in</Link>
                } 
                {
                    !this.props.user.authenticated
                    ? <span>&nbsp;|&nbsp;<Link to="/register">Register</Link></span>
                    : ""
                }
                &nbsp;|&nbsp;
                <Link to="/home">Home</Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/">About</Link>
            </div>
        );
    }
}

Navigation.propTypes = {
    manualLogout: any,
    user: any
}
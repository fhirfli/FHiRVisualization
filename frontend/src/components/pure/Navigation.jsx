import React, { Component } from "react";
import { Link } from "react-router";
import { any } from "prop-types";
import './Navigation.scss';

var navStyle = {
    backgroundColor: "#EEE",
    padding: "10px"
};


var buttonStyle = {
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
            <div id="navbar-root">
                {
                    this.props.user.authenticated
                    ? <a onClick={this._logout} style={buttonStyle}>Logout {this.props.user.username}</a>
                    : <Link to="/login">Log in</Link>
                } 
                {
                    !this.props.user.authenticated &&
                     (
                     <Link to="/register">Register</Link>
                     )
                }
                {
                    this.props.user.authenticated && (
                        <Link to="/home">Home</Link>
                    )
                }
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
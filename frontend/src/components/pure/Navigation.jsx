import React, {Component} from "react";
import {Link} from "react-router";
import {any} from "prop-types";
import './Navigation.scss';
import * as  corporateStatus from 'constants/corporateStatus';

const navStyle = {
    backgroundColor: "#EEE",
    padding: "10px"
};


const buttonStyle = {};


export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this._IndividualLogout = this._IndividualLogout.bind(this);
        this._Corporatelogout = this._Corporatelogout.bind(this);
    }

    _IndividualLogout(event) {
        event.preventDefault();
        this.props.individualManualLogout();
    }

    _Corporatelogout(event) {
        event.preventDefault();
        this.props.corporateManualLogout();
    }


    render() {
        return this.props.user.corporateStatus === corporateStatus.INDIVIDUAL ?
            (
                <div id="navbar-root">
                    <a onClick={this._IndividualLogout} style={buttonStyle}>Logout {this.props.user.email }</a>
                    <Link to="/individual/home">Home</Link>
                    <Link to="/individual/data">All Data</Link>
                    <Link to="/individual/goals">Goals</Link>
                    <Link to="/individual/settings">Settings</Link>
                </div>
            )
            : this.props.user.corporateStatus === corporateStatus.CORPORATE ?
                (
                    <div id="navbar-root">
                        <a onClick={this._Corporatelogout} style={buttonStyle}>Logout {this.props.user.email }</a>
                        <Link to="/corporate/home">Home</Link>
                        <Link to="/corporate/data">All Data</Link>
                        <Link to="/corporate/settings">Settings</Link>
                    </div>
                )
                :
                (
                    <div id="navbar-root">
                        <Link to="/individual/login">Log in</Link>
                    </div>
                );
    }
}

Navigation.propTypes = {
    corporateManualLogout: any,
    individualManualLogout: any,
    user: any
};

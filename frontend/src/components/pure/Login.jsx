import React, { Component } from "react";
import { any } from "prop-types";
import { Link } from "react-router";
import ReactDOM from "react-dom";
import axios from "axios";

import './Login.scss';


const loginMessageStyle = {
    color: "red"
};

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginMessage: "",
            email: '',
            password: ""
        };

        this._onLoginSubmit = this._onLoginSubmit.bind(this);
    }

    _onLoginSubmit(event) {
        event.preventDefault();
        const email = this.state.email;
        const password = this.state.password;

        const nextPath = this.props.nextPathname || "/";

        this.props.manualLogin({
            username: email,
            password
        }, nextPath)
            .then((loginMessage) => {
                console.log("Recieved [" + loginMessage + "]");
                if (loginMessage) {
                    this.setState({
                        loginMessage
                    })
                }
            });
    }

    render() {
        return (
            <div id="login-parent-container">
                <div id="login-container">
                    <form id="login-form" onSubmit={this._onLoginSubmit}>
                        {/* <h2 id="login-text">Log in</h2> */}
                        <input className="login-inp" type="email" onChange={e => this.setState({ email: e.target.value })} placeholder="username" /><br />
                        <input className="login-inp" type="password" onChange={e => this.setState({ password: e.target.value })} placeholder="Password" /><br />
                        <input id="login-submit" type="submit" value="Login" />
                        <p>
                        Don&lsquo;t have an account? <Link to="/register">Sign up</Link>
                        </p>
                    </form>
                    {this.state.loginMessage && (
                    <div id="login-error">
                        {this.state.loginMessage}
                    </div>
                    )}
               </div>
            </div>
        );
    }
}

Login.propTypes = {
    manualLogin: any,
    nextPathname: any
}
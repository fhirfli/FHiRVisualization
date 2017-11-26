import React, { Component } from "react";
import { any } from "prop-types";
import ReactDOM from "react-dom";
import axios from "axios";



const loginMessageStyle = {
    color: "red"
};

export default class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            loginMessage: ""
        };

        this._onLoginSubmit = this._onLoginSubmit.bind(this);
    }

    _onLoginSubmit(event) {
        event.preventDefault();
        const email = (this.email).nodeValue;
        const password = (this.password).nodeValue;


        this.props.manualLogin({
            email,
            password
        }, this.props.nextPathname)
        .then((loginMessage) => {
            if(loginMessage) {
                this.setState({
                    loginMessage
                })
            }
        });
    }

    render() {
        return(
            <div>
                <h2>Log in</h2>
                <form onSubmit={this._onLoginSubmit}>
                    <input type="email" ref={email => this.email = email} placeholder="username"/><br/>
                    <input type="password" ref={password => this.password = password} placeholder="Password"/><br/>
                    <input type="submit" value="Login" />
                    <span style={loginMessageStyle}>
                    {this.state.loginMessage}
                    </span>
                </form>
            </div>
        );
    }
}

Login.propTypes = {
    manualLogin: any,
    nextPathname: any
}
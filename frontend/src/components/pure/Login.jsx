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
                    <input type="email" onChange={e => this.setState({email: e.target.value})} placeholder="username"/><br/>
                    <input type="password" onChange={e => this.setState({password: e.target.value})} placeholder="Password"/><br/>
                    <input type="submit" value="Login" />
               </form>
                    <span style={loginMessageStyle}>
                    {this.state.loginMessage}
                    </span>
            </div>
        );
    }
}

Login.propTypes = {
    manualLogin: any,
    nextPathname: any
}
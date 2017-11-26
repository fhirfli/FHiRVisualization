import React, { Component } from "react";
import ReactDOM from "react-dom";
import { any } from "prop-types";

const registerMessageStyle = {
    color: "red"
};


export default class Register extends Component {
    constructor(props){ 
        super(props);
        this.state = {
            registerMessage: ""
        };

        this._onRegisterSubmit = this._onRegisterSubmit.bind(this);
    }

    _onRegisterSubmit(event) {
        event.preventDefault();
        const email = (this.email).nodeValue;
        const password = (this.password).nodeValue;

        this.props.manualRegister({
            email,
            password
        })
        .then((registerMessage) => {
            if(registerMessage) {
                this.setState({
                    registerMessage
                });
            }
        });
    }

    render() {
        return (
            <div>
                <h2>Register</h2>
                <form onSubmit={this._onRegisterSubmit}>
                    <input type="email" ref={email => this.email = email} placeholder="Email" /><br/>
                    <input type="password" ref={password => this.password = password} placeholder="Password" /><br/>
                    <input type="submit" value="Register" />
                    <span style={registerMessageStyle}>{this.state.registerMessage}</span>
                </form>
            </div>
        );
    }
}

Register.propTypes = {
    manualRegister: any
}
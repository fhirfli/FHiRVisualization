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
            registerMessage: "",
            email: "",
            password: ""
        };

        this._onRegisterSubmit = this._onRegisterSubmit.bind(this);
    }

    _onRegisterSubmit(event) {
        event.preventDefault();
        const email = this.state.email;
        const password = this.state.password;

        this.props.manualRegister({
            username: email,
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
                    <input type="email" onChange={e => this.setState({email: e.target.value})} placeholder="Email" /><br/>
                    <input type="password" onChange={e => this.setState({password: e.target.value})} placeholder="Password" /><br/>
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
import React from "react";
import {Router, Route, IndexRoute} from "react-router";
import App from "components/container/App";
import LoginContainer from "components/container/LoginContainer";
import RegisterContainer from "components/container/RegisterContainer";
import HomeContainer from "components/container/HomeContainer";
import Default from "components/pure/Default";

export default function createRoutes(store, history) {
    const requireAuth = (nextState, replace, callback) => {
        const { user: { authenticated }} = store.getState();

        if (!authenticated) {
            replace({
                pathname: "/login",
                state: { nextPathname: nextState.location.pathname }
            });
        }

        callback();
    }


    return (
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Default}/>
                <Route path="login" component={LoginContainer} />
                <Route path="register" component={RegisterContainer} />
                <Route path="home" component={HomeContainer} onEnter={requireAuth}/>
            </Route>
        </Router>
    )
}
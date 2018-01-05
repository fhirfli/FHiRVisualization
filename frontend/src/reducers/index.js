import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import user from 'reducers/user';

export default combineReducers({
    user: user,
    routing: routerReducer
});
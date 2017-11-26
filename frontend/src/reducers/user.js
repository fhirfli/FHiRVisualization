import { 
    MANUAL_LOGIN_USER,
	LOGIN_SUCCESS_USER,
	LOGIN_ERROR_USER,
	SIGNUP_USER,
	SIGNUP_SUCCESS_USER,
	SIGNUP_ERROR_USER,
	LOGOUT_USER,
	LOGOUT_SUCCESS_USER,
	LOGOUT_ERROR_USER,
	REGISTER_USER,
	REGISTER_SUCCESS_USER,
	REGISTER_ERROR_USER	
} from "../constants"


const user = (state = {
    isWaiting: false,
    authenticated: false,
    email: ""
}, action) => {
    switch(action.type) {
    case MANUAL_LOGIN_USER:
        return Object.assign({}, state, {isWaiting: true});
        break;
	case LOGIN_SUCCESS_USER:
        return Object.assign({}, state, {isWaiting: false, authenticated: true, email: action.data.username});
        break;
	case LOGIN_ERROR_USER:
        return Object.assign({}, state, {isWaiting: false, authenticated: false});
        break;
	case SIGNUP_USER:
        return Object.assign({}, state, {isWaiting: true});
        break;
	case SIGNUP_SUCCESS_USER:
        return Object.assign({}, state, {isWaiting: false, authenticated: true});
        break;
	case SIGNUP_ERROR_USER:
        return Object.assign({}, state, {isWaiting: false, authenticated: false});
        break;
	case LOGOUT_USER:
        return Object.assign({}, state, {isWaiting: true});
        break;
	case LOGOUT_SUCCESS_USER:
        return Object.assign({}, state, {isWaiting: false, authenticated: false, email: ""});
        break;
	case LOGOUT_ERROR_USER:
        return Object.assign({}, state, {isWaiting: false, authenticated: true});
        break;
	case REGISTER_USER:
        return Object.assign({}, state, {isWaiting: true});
        break;
	case REGISTER_SUCCESS_USER:
        return Object.assign({}, state, {isWaiting: false});
        break;
	case REGISTER_ERROR_USER:
        return Object.assign({}, state, {isWaiting: false});
        break;
    default:
        // VERY IMPORTANT
        return state;
    }
}



export default user;
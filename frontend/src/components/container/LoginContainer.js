import { connect } from "react-redux";
import * as userActions from "actions/users";
import Login from "components/pure/Login";

const mapStateToProps = (state, ownProps) => {
    let nextPathName = "/home";
    try {
        nextPathName = ownProps.location.state.nextPathName
    } catch(err) {}

    console.log("Next path name is  "  + nextPathName);

    return {
        user: state.user,
        nextPathName
    }
}


export default connect(
    mapStateToProps,
    userActions
)(Login);
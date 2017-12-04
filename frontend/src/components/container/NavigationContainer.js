import { connect } from "react-redux";
import * as userActions from "actions/users";
import Navigation from "components/pure/Navigation";


function mapStateToProps(state) {
    return {
        user: state.user
    };
};

console.log(userActions);
export default connect(
    mapStateToProps,
    userActions
)(Navigation);
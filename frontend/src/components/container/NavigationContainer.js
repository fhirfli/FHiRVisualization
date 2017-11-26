import { connect } from "react-redux";
import * as userActions from "actions/users";
import Navigation from "components/pure/Navigation";


const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export default connect({
    mapStateToProps,
    userActions
})(Navigation);
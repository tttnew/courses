import { connect } from "react-redux";
import Navigation from "../components/Navigation";
import { sitelogOut } from "../actions/sessionActions";

let mapStateToProps = state => {
  return {
    session: state.session
  };
};

const matDispatchToProps = dispatch => {
  return {
    handlerLogOut: () => {
      dispatch(sitelogOut());
    }
  };
};

const AppNavigation = connect(mapStateToProps, matDispatchToProps)(Navigation);

export default AppNavigation;

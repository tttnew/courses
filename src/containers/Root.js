import React, { Component } from "react";
import { connect } from "react-redux";
import AppNavigation from "../containers/AppNavigation";
import AuthPage from "../components/AuthPage";
import RedirectWithMessage from "./RedirectWithMessage";
import AutoAuth from "./AutoAuth";
import CoursePageAsync from "./CoursePageAsync";
import FavoritesPageAsync from "./FavoritesPageAsync";
import UserPageAsync from "./UserPageAsync";
import FlashMessageSnackbar from "./FlashMessageSnackbar";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

class Root extends Component {
  render() {
    return (
      <Router>
        <div>
          <AppNavigation />

          <Route path="/" exact={true} component={CoursePageAsync} />
          <Route path="/sort/:sortType" exact={true} component={CoursePageAsync} />
          <Route
            path="/favorites"
            exact={true}
            component={FavoritesPageAsync}
          />
          <Route
            path="/login"
            render={() => {
              return this.props.session ? (
                <Redirect to="/add" />
              ) : (
                <AuthPage tabValue={0} />
              );
            }}
          />
          <Route
            path="/registration"
            render={() => {
              return this.props.session ? (
                <Redirect to="/add" />
              ) : (
                <AuthPage tabValue={1} />
              );
            }}
          />
          <Route
            path="/add"
            render={() => {
              return !this.props.session ? (
                <RedirectWithMessage to="/login" />
              ) : (
                <UserPageAsync />
              );
            }}
          />
          <Route
            path="/auto-auth"
            render={() => {
              return !this.props.session ? (
                <AutoAuth to="/add" />
              ) : (
                <UserPageAsync />
              );
            }}
          />
          <FlashMessageSnackbar />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    session: state.session
  };
};

Root = connect(mapStateToProps)(Root);

export default Root;

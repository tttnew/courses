import React, { Component } from "react";
import { connect } from "react-redux";
import { addFlashMessage } from "../actions/flashMessageActions";
import { Redirect } from "react-router-dom";

class RedirectWithMessage extends Component {
  componentWillMount() {
    this.props.dispatch(addFlashMessage("Авторизуйтесь"));
  }

  render() {
    return <Redirect to={this.props.to} />;
  }
}

RedirectWithMessage = connect()(RedirectWithMessage);

export default RedirectWithMessage;

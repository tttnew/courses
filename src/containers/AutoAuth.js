import React, { Component } from "react";
import { connect } from "react-redux";
import { addFlashMessage } from "../actions/flashMessageActions";
import { testAuth } from "../actions/sessionActions";

class AutoAuth extends Component {
  componentWillMount() {
    let { dispatch } = this.props;
    dispatch(testAuth())
      .then(() => {
        dispatch(addFlashMessage("Вы успешно авторизованы"));
      })
      .catch(() => {
        dispatch(addFlashMessage("Ошибка"));
      });
  }

  render() {
    return <div />;
  }
}

AutoAuth = connect()(AutoAuth);

export default AutoAuth;

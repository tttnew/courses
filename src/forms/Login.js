import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { loginUser } from "../actions/sessionActions";
import { addFlashMessage } from "../actions/flashMessageActions";

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

const validate = values => {
  const errors = {};
  if (!values.password) {
    errors.password = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  return errors;
};

let Login = ({ handleSubmit, pristine, submitting, dispatch }) => (
  <form>
    <div>
      <Field
        name="email"
        component={renderTextField}
        type="text"
        label="Email"
      />
    </div>
    <div>
      <Field
        name="password"
        component={renderTextField}
        type="password"
        label="Password"
      />
    </div>
    <RaisedButton
      label="Submit"
      primary={true}
      type="submit"
      onClick={handleSubmit(data => {
        dispatch(loginUser(data))
          .then(() => {
            dispatch(addFlashMessage("Вы успешно авторизованы"));
          })
          .catch(() => {
            dispatch(addFlashMessage("Ошибка"));
          });
      })}
    />
  </form>
);

Login = connect()(Login);

Login = reduxForm({
  // a unique name for the form
  form: "login",
  validate
})(Login);

export default Login;

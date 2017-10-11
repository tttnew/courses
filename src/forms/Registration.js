import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { registrationUser } from "../actions/sessionActions";
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
  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm = "Required";
  }
  if (
    values.password &&
    values.passwordConfirm &&
    values.password !== values.passwordConfirm
  ) {
    errors.password = "Password does not match the confirm password";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  return errors;
};

let Registration = ({ handleSubmit, dispatch }) => (
  <form>
    <div>
      <Field name="name" component={renderTextField} type="text" label="Name" />
    </div>
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
    <div>
      <Field
        name="passwordConfirm"
        component={renderTextField}
        type="password"
        label="Confirm password"
      />
    </div>

    <RaisedButton
      label="Submit"
      primary={true}
      type="submit"
      onClick={handleSubmit(data => {
        dispatch(registrationUser(data))
          .then(() => {
            dispatch(addFlashMessage("Вы успешно зарегистрированы"));
          })
          .catch(() => {
            dispatch(addFlashMessage("Ошибка"));
          });
      })}
    />
  </form>
);

Registration = connect()(Registration);

Registration = reduxForm({
  // a unique name for the form
  form: "registration",
  validate
})(Registration);

export default Registration;

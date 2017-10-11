import React from "react";
import { Field, reduxForm } from "redux-form";
import TextField from "material-ui/TextField";

const renderTextField = ({
  input,
  label,
  multiLine,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    multiLine={multiLine}
    {...input}
    {...custom}
  />
);

//validators
const required = value => (value ? undefined : "Required");
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength50 = maxLength(50);
const maxLength250 = maxLength(250);
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength2 = minLength(2);
const number = value =>
  value && isNaN(Number(value)) ? "Must be a number" : undefined;
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;
const maxValue = max => value =>
  value && value > max ? `Must be no bigger than ${max}` : undefined;
const minValue100 = minValue(100);
const maxValue500000 = maxValue(500000);
const minValue1 = minValue(1);
const maxValue24 = maxValue(24);

const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;

let Course = ({ onSubmit, dispatch }) => (
  <form onSubmit={onSubmit}>
    <div>
      <Field
        name="title"
        component={renderTextField}
        type="text"
        label="Title"
        validate={[required, maxLength50, minLength2, alphaNumeric]}
      />
    </div>
    <div>
      <Field
        name="description"
        component={renderTextField}
        type="textarea"
        label="Description"
        multiLine={true}
        validate={[required, maxLength250, minLength2]}
      />
    </div>
    <div>
      <Field
        name="hour_qty"
        component={renderTextField}
        type="text"
        label="Course time(Hours)"
        validate={[required, minValue1, maxValue24, number]}
      />
    </div>
    <div>
      <Field
        name="cost"
        component={renderTextField}
        type="text"
        label="Cost"
        validate={[required, maxValue500000, minValue100, number]}
      />
    </div>
  </form>
);

Course = reduxForm({
  // a unique name for the form
  form: "course"
})(Course);

export default Course;

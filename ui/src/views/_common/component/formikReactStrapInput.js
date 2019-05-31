import React from 'react';
import { getIn } from 'formik';
import { Input, FormFeedback } from 'reactstrap';

// as per https://codebrains.io/build-react-forms-validation-formik-reactstrap/
// Use getIn to tackle with showing field array's error (this is magic)
const CustomInputForm = ({ field, form: { touched, errors }, ...props }) => (
  <div>
    <Input
      invalid={!!(getIn(touched, field.name) && getIn(errors, field.name))}
      {...field}
      {...props}
    />
    {!!(getIn(touched, field.name) && getIn(errors, field.name)) && <FormFeedback>{getIn(errors, field.name)}</FormFeedback>}
  </div>
);

export default CustomInputForm;

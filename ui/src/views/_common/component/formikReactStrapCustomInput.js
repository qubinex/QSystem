import React from 'react';
import { CustomInput, FormFeedback } from 'reactstrap';

// as per https://codebrains.io/build-react-forms-validation-formik-reactstrap/

const CustomInputForm = ({ field, form: { touched, errors }, ...props }) => (
  <div>
    <CustomInput
      invalid={!!(touched[field.name] && errors[field.name])}
      {...field}
      {...props}
    />
    {touched[field.name] && errors[field.name] && <FormFeedback>{errors[field.name]}</FormFeedback>}
  </div>
);

export default CustomInputForm;

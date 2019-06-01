import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  FormGroup,
  Label,
  Card,
  CardBody,
} from 'reactstrap';

import FormikReactStrapInput from '../_common/component/formikReactStrapInput';

class SearchVendor extends Component {
  render() {
    return (
      <Formik
        render={({ values, errors, handleChange, handleBlur, handleSubmit, isValid, submitForm, setFieldValue }) => (
          <Form>
            <Card>
              <CardBody>
                <FormGroup row>
                  <Field
                    name="searchVendor"
                    id="searchVendor"
                    placeholder="Search vendor"
                    component={FormikReactStrapInput}
                  />
                </FormGroup>
              </CardBody>
            </Card>
          </Form>
        )}
      />
    );
  }
}

export default SearchVendor;

import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  FormGroup,
  Label,
  Col,
  Card,
  CardBody,
  Table,
  Button,
} from 'reactstrap';

import FormikReactStrapInput from '../_common/component/formikReactStrapInput';

class SearchVendor extends Component {
  handleSubmit = () => {

  }

  render() {
    return (
      <Formik
        render={({ values, errors, handleChange, handleBlur, handleSubmit, isValid, submitForm, setFieldValue }) => (
          <Form>
            <Card>
              <CardBody>
                <FormGroup row>
                  <Col xs="12">
                    <Field
                      name="searchVendor"
                      id="searchVendor"
                      placeholder="Search vendor"
                      component={FormikReactStrapInput}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Table>
                    <tbody>
                      <tr>
                        <td>
                          ALoha
                        </td>
                        <td>
                          Queue only
                        </td>
                        <td>
                          20mins Q time
                        </td>
                        <td>
                          <Button>
                            Queue now!
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
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

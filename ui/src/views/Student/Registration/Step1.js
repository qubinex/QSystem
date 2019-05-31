import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  FormGroup,
  Label,
  Input,
  Row,
} from 'reactstrap';
import { Formik, Form, ErrorMessage } from 'formik';
import Axios from 'axios';
import ValidateExistingUser from './ValidateExistingUser';

class StudentRegistrationStep1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      isExistingUser: null,
      countries: [],
    };
  }

  componentDidMount() {
    this.getCountryList();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { setDangerAlert, resetAlert } = this.props;
    const { isExistingUser } = this.state;
    const { setFlags } = this.props;

    resetAlert();
    if (isExistingUser === 1) {
      setFlags(2.2);
    } else if (isExistingUser === 0) {
      setFlags(2.1);
    } else {
      setDangerAlert(true, 'Please select a value');
    }
  }

  getCountryList = () => {
    Axios.get('/api/country/getCountryList')
      .then((response) => {
        this.setState({ countries: response.data });
        // console.log(response);
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  render() {
    const { searchExistingUser } = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm={{ size: 6, offset: 3 }}>
            <Formik
              map
              initialValues={{
                contactLast4Digits: '',
                email: '',
              }}
              validationSchema={ValidateExistingUser}
              onSubmit={(values) => {
                searchExistingUser(values.email, values.contactLast4Digits);
              }}
              render={({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, submitForm }) => (
                <Form onSubmit={handleSubmit}>
                  <Card>
                    <CardHeader>
                      <strong>New registration</strong>
                    </CardHeader>
                    <CardBody>
                      <FormGroup row>
                        <Label for="email" sm={4}>Email</Label>
                        <Col sm={8}>
                          <Input
                            name="email"
                            type="text"
                            placeholder="Email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            invalid={errors.email && touched.email}
                          />
                          <ErrorMessage name="email" component="div" />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="contact" sm={4}>Contact</Label>
                        <Col sm={8}>
                          <Input
                            type="text"
                            name="contactLast4Digits"
                            id="contactLast4Digits"
                            placeholder="Contact last 4 digits"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength="4"
                            invalid={errors.contactLast4Digits && touched.contactLast4Digits}
                          />
                          <ErrorMessage name="contactLast4Digits" component="div" />
                        </Col>
                      </FormGroup>
                    </CardBody>
                    <CardFooter>
                      <Button
                        color="primary"
                        type="button"
                        className="pull-right"
                        onClick={() => submitForm()}
                        disabled={!(isValid)}
                      >
                        Next step
                        {' '}
                        <i className="fa fa-arrow-circle-right" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Form>
              )}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default StudentRegistrationStep1;

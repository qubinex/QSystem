import React, { Component } from 'react';
import Axios from 'axios';
import Moment from 'moment';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CustomInput,
  FormGroup,
  Col,
  Label,
  Row,
} from 'reactstrap';
import { Formik, Form, ErrorMessage, Field } from 'formik';
// For react-widgets import
import momentLocalizer from 'react-widgets-moment';
import { DateTimePicker } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';
import ButtonSubmit from '../../_common/component/buttonSubmit';
import CustomInputForm from '../../_common/component/formikReactStrapInput';
import ValidateRegistration from './ValidateRegistration';

Moment.locale('en');
momentLocalizer();

class Forms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isContinueLater: false,
      isSubmitting: false,
      isLoadingState: false,
      isLoadingCity: false,
      countries: [],
      states: [],
      cities: [],
      usersinfo: {
        firstName: '',
        lastName: '',
        gender: '0',
        dob: Moment(),
        identification: '',
        email: props.email,
        contactCountryCode: '0',
        contact: '',
        addressLine1: '',
        addressLine2: '',
        city: '0',
        postcode: '',
        state: '0',
        country: '0',
      }
    };
  }

  componentDidMount() {
    this.getCountryList();
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  getCountryList = () => {
    Axios.get('/api/country/getCountryList')
      .then((response) => {
        this.setState({
          countries: response.data,
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  getStateList = (e) => {
    const target = e.target;
    this.setState({
      isLoadingState: true,
      states: [],
    });
    Axios.get(`/api/country/getStateListByCountry/${target.value}`)
      .then((response) => {
        console.log(response);
        this.setState({
          states: response.data,
          isLoadingState: false,
        });
      })
      .catch((err) => {
        console.log(err);
        // console.log(err);
      });
  }

  getCityList = (e) => {
    const target = e.target;
    this.setState({
      isLoadingCity: true,
      cities: [],
    });
    Axios.get(`/api/country/getCityListByState/${target.value}`)
      .then((response) => {
        this.setState({
          cities: response.data,
          isLoadingCity: false,
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  render() {
    const {
      isLoadingState,
      isLoadingCity,
      countries,
      states,
      cities,
      usersinfo,
    } = this.state;
    const { setNewStudentInfo, newStudentInfo } = this.props;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm={{ size: 8, offset: 2 }}>
            <Formik
              initialValues={newStudentInfo.length > 0 ? newStudentInfo : usersinfo}
              validationSchema={ValidateRegistration}
              onSubmit={(values) => {
                setNewStudentInfo(values);
              }}
              render={({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, submitForm, setFieldValue }) => (
                <Form>
                  <Card>
                    <CardHeader>
                      <strong>New registration</strong>
                    </CardHeader>
                    <CardBody>
                      <FormGroup row>
                        <Col md="3">
                          <Label for="firstName">Name</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Row>
                            <Col xs="12" sm="6">
                              <Field name="firstName" type="text" component={CustomInputForm} placeholder="First name" />
                            </Col>
                            <Col xs="12" sm="6">
                              <Field name="lastName" type="text" component={CustomInputForm} placeholder="Last name" />
                            </Col>
                          </Row>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="6" xs="12">
                          <Row>
                            <Col md="6">
                              <Label for="gender">Gender</Label>
                            </Col>
                            <Col xs="12" md="6">
                              <Field component={CustomInputForm} type="select" name="gender" id="gender">
                                <option disabled value="0">Choose gender</option>
                                <option value="1">Male</option>
                                <option value="2">Female</option>
                              </Field>
                            </Col>
                          </Row>
                        </Col>
                        <Col md="6" xs="12">
                          <Row>
                            <Col md="3">
                              <Label for="dob">Date of birth</Label>
                            </Col>
                            <Col xs="12" md="9">
                              <DateTimePicker
                                name="dob"
                                time={false}
                                placeholder="Date of birth"
                                value={values.dob.toDate()}
                                onChange={value => setFieldValue('dob', Moment(value))}
                                required
                              />
                            </Col>
                          </Row>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label for="identification">NRIC/Passport no.</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Field name="identification" id="identification" placeholder="NRIC/Passport no." component={CustomInputForm} />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label for="email">Email</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Field name="email" id="email" placeholder="Email" component={CustomInputForm} />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label for="email">Contact</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Row>
                            <Col xs="12" sm="5">
                              <Field type="select" name="countryCodeContact" component={CustomInputForm}>
                                <option disabled value="0">Country code</option>
                                {countries.map((item) => {
                                  return (<option key={item.phone} value={item.phone}>{item.name}({item.phone})</option>);
                                })}
                              </Field>
                            </Col>
                            <Col xs="12" sm="7">
                              <Field name="contact" id="contact" placeholder="Contact number" component={CustomInputForm} />
                            </Col>
                          </Row>
                        </Col>
                      </FormGroup>
                    </CardBody>
                    <CardHeader>
                      <CustomInput type="checkbox" id="isContinueLater" name="isContinueLater" label="Continue later" onChange={this.handleInputChange} />
                    </CardHeader>
                    <CardBody>
                      <FormGroup row>
                        <Col md="3">
                          <Label for="addressLine1">Address</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Field name="addressLine1" id="addressLine1" placeholder="Address line 1" component={CustomInputForm} />
                          <Field name="addressLine2" id="addressLine2" placeholder="Address line 2" component={CustomInputForm} />
                          <Row>
                            <Col xs="12" md="6">
                              <Field
                                type="select"
                                name="country"
                                id="country"
                                onChange={(e) => {
                                  this.getStateList(e);
                                  setFieldValue('country', e.target.value);
                                }}
                                component={CustomInputForm}
                              >
                                <option value="0" disabled>Country</option>
                                {countries.map((item) => {
                                  return (<option key={item.iso} value={item.iso}>{item.country}</option>);
                                })}
                              </Field>
                            </Col>
                            <Col xs="12" md="6">
                              <Field
                                type="select"
                                name="state"
                                id="state"
                                disabled={isLoadingState}
                                onChange={(e) => {
                                  this.getCityList(e);
                                  setFieldValue('state', e.target.value);
                                }}
                                component={CustomInputForm}
                              >
                                <option value="0" disabled>State</option>
                                {states.map((item) => {
                                  return (<option key={item.state_id} value={item.state_id}>{item.state}</option>);
                                })}
                              </Field>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs="12" md="6">
                              <Field type="select" name="city" id="city" disabled={isLoadingCity} component={CustomInputForm}>
                                <option value="0" disabled>City</option>
                                {cities.map((item) => {
                                  return (<option key={item.city_id} value={item.city_id}>{item.city}</option>);
                                })}
                              </Field>
                            </Col>
                            <Col xs="12" md="6">
                              <Field name="postcode" id="postcode" type="text" placeholder="Postcode" component={CustomInputForm} />
                            </Col>
                          </Row>
                        </Col>
                      </FormGroup>
                    </CardBody>
                    <CardFooter>
                      <ButtonSubmit type="button" onClick={() => submitForm()} text="Submit" color="primary" disabled={!isValid} />
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

export default Forms;

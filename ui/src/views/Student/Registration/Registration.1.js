import React, { Component } from 'react';
import Axios from 'axios';
import Moment from 'moment';
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Label,
  Row,
} from 'reactstrap';

import { AvForm, AvField, AvGroup, AvFeedback, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
// For react-widgets import
import momentLocalizer from 'react-widgets-moment';
import { DateTimePicker } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';
import ButtonSubmit from '../../_common/component/buttonSubmit';

Moment.locale('en');
momentLocalizer();

class Forms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubmitting: false,
      isLoadingState: false,
      isLoadingCity: false,
      countries: [],
      states: [],
      cities: [],
      firstName: '',
      lastName: '',
      gender: '0',
      dob: Moment(),
      identification: '',
      email: '',
      contactCountryCode: '0',
      contact: '',
      addressLine1: '',
      addressLine2: '',
      city: '0',
      postcode: '',
      state: '0',
      country: '0',
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
      firstName,
      lastName,
      gender,
      dob,
      identification,
      email,
      contactCountryCode,
      contact,
      addressLine1,
      addressLine2,
      city,
      postcode,
      state,
      country,
    } = this.state;
    const { nextStep } = this.props;
    return (
      <div className="animated fadeIn">
        <AvForm>
          <Row>
            <Col xs="12" sm={{ size: 8, offset: 2 }}>
              <Card>
                <CardHeader>
                  <strong>Student registration</strong>
                </CardHeader>
                <CardBody>
                  <AvGroup row>
                    <Col md="3">
                      <Label for="firstName">Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Row>
                        <Col xs="12" sm="6">
                          <AvField name="firstName" id="firstName" placeholder="First name" value={firstName} onChange={this.handleInputChange} required />
                        </Col>
                        <Col xs="12" sm="6">
                          <AvField name="lastName" id="lastName" placeholder="Last name" value={lastName} onChange={this.handleInputChange} required />
                        </Col>
                      </Row>
                    </Col>
                  </AvGroup>
                  <AvGroup row>
                    <Col md="6" xs="12">
                      <Row>
                        <Col md="6">
                          <Label for="email">Gender</Label>
                        </Col>
                        <Col xs="12" md="6">
                          <AvField type="select" name="gender" id="gender" value={gender} onChange={this.handleInputChange} required>
                            <option disabled value="0">Choose gender</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                          </AvField>
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
                            value={dob.toDate()}
                            onChange={value => this.setState({ dob: Moment(value) })}
                            required
                          />
                        </Col>
                      </Row>
                    </Col>
                  </AvGroup>
                  <AvGroup row>
                    <Col md="3">
                      <Label for="identification">NRIC/Passport no.</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <AvField name="identification" id="identification" placeholder="NRIC/Passport no." value={identification} required />
                    </Col>
                  </AvGroup>
                  <AvGroup row>
                    <Col md="3">
                      <Label for="email">Email</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <AvField name="email" id="email" placeholder="Email" validate={{ email: true }} value={email} required />
                    </Col>
                  </AvGroup>
                  <AvGroup row>
                    <Col md="3">
                      <Label for="email">Contact</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Row>
                        <Col xs="12" sm="5">
                          <AvField type="select" name="countryCodeContact" value={contactCountryCode} required>
                            <option disabled value="0">Country code</option>
                            {countries.map((item) => {
                              return (<option key={item.phone} value={item.phone}>{item.name}({item.phone})</option>);
                            })}
                          </AvField>
                        </Col>
                        <Col xs="12" sm="7">
                          <AvField name="contact" id="contact" placeholder="Contact number" value={contact} required />
                        </Col>
                      </Row>
                    </Col>
                  </AvGroup>
                </CardBody>
                <CardHeader />
                <CardBody>
                  <AvGroup row>
                    <Col md="3">
                      <Label for="addressLine1">Address</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <AvField name="addressLine1" id="addressLine1" placeholder="Address line 1" value={addressLine1} />
                      <AvField name="addressLine2" id="addressLine2" placeholder="Address line 2" value={addressLine2} />
                      <Row>
                        <Col xs="12" md="6">
                          <AvField type="select" name="country" value={country} onChange={e => this.getStateList(e)} required>
                            <option value="0" disabled>Country</option>
                            {countries.map((item) => {
                              return (<option key={item.iso} value={item.iso}>{item.country}</option>);
                            })}
                          </AvField>
                        </Col>
                        <Col xs="12" md="6">
                          <AvField type="select" name="State" value={state} disabled={isLoadingState} onChange={e => this.getCityList(e)} required>
                            <option value="0" disabled>State</option>
                            {states.map((item) => {
                              return (<option key={item.state_id} value={item.state_id}>{item.state}</option>);
                            })}
                          </AvField>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="12" md="6">
                          <AvField type="select" name="City" value={city} disabled={isLoadingCity} required>
                            <option value="0" disabled>City</option>
                            {cities.map((item) => {
                              return (<option key={item.city_id} value={item.city_id}>{item.city}</option>);
                            })}
                          </AvField>
                        </Col>
                        <Col xs="12" md="6">
                          <AvField name="postcode" id="postcode" placeholder="Postcode" value={postcode} />
                        </Col>
                      </Row>
                    </Col>
                  </AvGroup>
                </CardBody>
                <CardFooter>
                  <Row>
                    <Button color="primary" type="submit" className="pull-right" onClick={nextStep}>
                      Next step
                      {' '}
                      <i className="fa fa-arrow-circle-right" />
                    </Button>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </AvForm>
      </div>
    );
  }
}

export default Forms;

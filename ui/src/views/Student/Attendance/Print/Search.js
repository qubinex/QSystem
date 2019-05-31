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
  Row,
} from 'reactstrap';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import Axios from 'axios';
import SelectDayDropDown from '../../../_common/component/selectDayDropDown';
import CustomInputForm from '../../../_common/component/formikReactStrapInput';
import ValidateSchedule from './ValidateSchedule';

class StudentRegistrationStep1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      isExistingUser: null,
      classTimes: [],
      selectedDay: 0,
    };
  }

  componentDidMount() {

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

  getClassTime = (event) => {
    const target = event.target;
    const value = target.value;
    Axios.post('/lesson/lesson/getClassTime', { day: value })
      .then((response) => {
        console.log(response.data);
        this.setState({
          classTimes: response.data,
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  render() {
    const { classTimes, selectedDay } = this.state;
    const { getAttendanceList } = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm={{ size: 6, offset: 3 }}>
            <Formik
              map
              initialValues={{
                day: 0,
                time: '0',
              }}
              validationSchema={ValidateSchedule}
              onSubmit={(values) => {
                getAttendanceList(values.day, values.time);
              }}
              render={({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, submitForm, setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                  <Card>
                    <CardHeader>
                      <strong>New registration</strong>
                    </CardHeader>
                    <CardBody>
                      <FormGroup row>
                        <Label for="day" sm={4}>Day</Label>
                        <Col sm={8}>
                          <SelectDayDropDown
                            onChange={(e) => {
                              this.getClassTime(e);
                              setFieldValue('day', e.target.value);
                            }}
                            SelectedDay={selectedDay}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="time" sm={4}>Time</Label>
                        <Col sm={8}>
                          <Field
                            type="select"
                            name="time"
                            id="time"
                            onChange={(e) => {
                              this.handleInputChange(e);
                              setFieldValue('time', e.target.value);
                            }}
                            component={CustomInputForm}
                          >
                            <option value="0" disabled>Select a time</option>
                            {classTimes.map((item) => {
                              return (<option key={item.start_time} value={item.start_time}>{item.start_time}</option>);
                            })}
                          </Field>
                          <ErrorMessage name="time" component="div" />
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

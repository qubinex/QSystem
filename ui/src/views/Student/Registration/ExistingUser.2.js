import React, { Component } from 'react';
/* eslint-disable object-curly-newline */
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Label,
  Row,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  CustomInput,
} from 'reactstrap';
import Axios from 'axios';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import ButtonProgress from '../../_common/component/buttonSubmit';

import ValidateExistingUser from './ValidateExistingUser';


class ExistingUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isCreateFamilyMember: null,
      isReadytoSubmit: false,
      isSearching: false,
      students: [],
      selectedStudents: [],
    };
    this.myForm = React.createRef();
  }

  searchExistingUser = (email_, contactLast4Digits_) => {
    const { setDangerAlert, resetAlert } = this.props;
    resetAlert();
    this.setState({
      isSearching: true,
      selectedStudents: [],
      isReadytoSubmit: false,
    });
    Axios.post('/student/student/getExistingStudentAndChildDetails', { email: email_, contactLast4Digits: contactLast4Digits_ })
      .then((response) => {
        const { data } = response;
        console.log(data);
        if (data) {
          this.setState({
            /*
            uid: data[0].id,
            name: `${data[0].first_name}, ${data[0].last_name}`,
            isReadytoSubmit: true,
            */
           students: data
          });
        } else {
          setDangerAlert(true, 'No result found.');
        }
      })
      .catch((err) => {
        setDangerAlert(true, err.response.data.error);
      })
      .finally(() => {
        this.setState({ isSearching: false });
      });
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  selectStudent = (event, id) => {
    const target = event.target;
    const checked = target.checked;
    const { selectedStudents, students } = this.state;
    let newArr = selectedStudents;
    if (checked) {
      const newStudent = students.find((value) => {
        return value.id === id;
      });
      newArr.push(newStudent);
    } else {
      newArr = newArr.filter((value) => {
        return value.id !== id;
      });
    }

    this.setState({
      selectedStudents: newArr,
      isReadytoSubmit: newArr.length > 0,
    });
  }

  setIsCreateFamilyMember = (createFamily) => {
    this.setState({ isCreateFamilyMember: createFamily });
  }

  handleSubmit_ = (event) => {
    event.preventDefault();
    const { uid, email, isCreateFamilyMember } = this.state;
    const { setFlags } = this.props;
    let step = 1;
    if (uid && email) {
      step = isCreateFamilyMember ? 3.2 : 4;
      setFlags(step);
    }
  }

  render() {
    const { isReadytoSubmit, isSearching, selectedStudents, isCreateFamilyMember, students } = this.state;
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
                const { setFlags, setStudentDetail } = this.props;
                let step = 1;
                if (selectedStudents.length > 0) {
                  step = isCreateFamilyMember ? 3.2 : 4;
                  setFlags(step);
                  setStudentDetail(selectedStudents);
                }
              }}
              render={({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, submitForm }) => (
                <Form onSubmit={handleSubmit}>
                  <Card>
                    <CardHeader>
                      <strong>Find existing user</strong>
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
                        <Label for="last4Digit" sm={4}>Contact last 4 digit</Label>
                        <Col sm={8}>
                          <InputGroup>
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
                            <InputGroupAddon addonType="append">
                              <ButtonProgress
                                type="button"
                                size=""
                                color="success"
                                text="Get user"
                                isSaving={isSearching}
                                onClick={() => this.searchExistingUser(values.email, values.contactLast4Digits)}
                                className="pull-right"
                                disabled={touched && !isValid}
                              />
                            </InputGroupAddon>
                          </InputGroup>
                          <ErrorMessage name="contactLast4Digits" component="div" />
                        </Col>
                      </FormGroup>
                    </CardBody>
                    <CardHeader>
                      Available user
                    </CardHeader>
                    <CardBody>
                      <FormGroup>
                        {
                          students.map((e) => {
                            return <CustomInput key={e.id} type="checkbox" id={`student-${e.id}`} label={`${e.name}`} onChange={event => this.selectStudent(event, e.id)} />;
                          })
                        }
                      </FormGroup>
                      <FormGroup row>
                        <Col xs={6}>
                          <Button
                            type="button"
                            outline={!isCreateFamilyMember}
                            color="success"
                            size="lg"
                            block
                            onClick={() => this.setIsCreateFamilyMember(true)}
                          >
                            {isCreateFamilyMember ? <i className="fa fa-check" /> : ''}
                            New family member
                            {' '}
                            <i className="fa fa-child" />
                          </Button>
                        </Col>
                        <Col xs={6}>
                          <Button
                            type="button"
                            outline={isCreateFamilyMember}
                            color="success"
                            size="lg"
                            block
                            onClick={() => this.setIsCreateFamilyMember(false)}
                          >
                            {!isCreateFamilyMember ? <i className="fa fa-check" /> : ''}
                            Class assignment
                            {' '}
                            <i className="fa fa-calendar" />
                          </Button>
                        </Col>
                      </FormGroup>
                    </CardBody>
                    <CardFooter>
                      <Button
                        color="primary"
                        type="button"
                        className="pull-right"
                        onClick={() => submitForm()}
                        disabled={!(isValid && isReadytoSubmit)}
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

export default ExistingUser;

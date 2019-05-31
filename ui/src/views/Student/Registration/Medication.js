import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  FormGroup,
  Col,
  Row,
} from 'reactstrap';
import { Formik, Form, Field } from 'formik';

import ButtonSubmit from '../../_common/component/buttonSubmit';
import CustomInputForm from '../../_common/component/formikReactStrapInput';

class Forms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      medicalConditions: [{ type: '', description: '' }],
    };
  }

  addMedicationCondition = () => {
    this.setState((prevState) => ({
      medicalConditions: [...prevState.medicalConditions, { type: '', description: '' }]
    }))
  }

  handleChange = (e) => {
    const field = e.target.dataset.field; // e.target.getAttribute('data-field')
    if (['type', 'description'].includes(field)) {
      let m = [...this.state.medicalConditions];
      m[e.target.dataset.id][field] = e.target.value.toUpperCase();
      this.setState({ m }/* , () => console.log(this.state.medicalConditions) */);
    } else {
      this.setState({ [field]: e.target.value.toUpperCase() });
    }
  }

  render() {
    const { medicalConditions } = this.state;
    const { setNewStudentMedicationinfo } = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm={{ size: 8, offset: 2 }}>
            <Formik
              onSubmit={(values) => {
                console.log('submitting')
                setNewStudentMedicationinfo(medicalConditions);
              }}
              render={({ handleSubmit, isValid, submitForm }) => (
                <Form onSubmit={handleSubmit}>
                  <Card>
                    <CardHeader>
                      <strong>Medical condition</strong>
                    </CardHeader>
                    <CardBody>
                      <FormGroup row>
                        <Col md="12" xs="12">
                          {
                            medicalConditions.map((e, index) => {
                              const medicTypeId = `medicType-${index}`;
                              const medicDescId = `medicDesc-${index}`;
                              return (
                                <Row key={medicTypeId}>
                                  <Col xs="12" md="6">
                                    <Field
                                      component={CustomInputForm}
                                      type="select"
                                      name="type"
                                      data-field="type"
                                      data-id={index}
                                      id={medicTypeId}
                                      value={medicalConditions[index].type}
                                      onChange={this.handleChange}
                                    >
                                      <option disabled value="0">Select type</option>
                                      <option value="1">Allergy</option>
                                      <option value="2">Disabled</option>
                                      <option value="3">Others</option>
                                    </Field>
                                  </Col>
                                  <Col xs="12" sm="6">
                                    <Field
                                      name="description"
                                      type="text"
                                      id={medicDescId}
                                      data-id={index}
                                      data-field="description"
                                      component={CustomInputForm}
                                      placeholder="Description"
                                      onChange={this.handleChange}
                                      value={medicalConditions[index].description}
                                    />
                                  </Col>
                                </Row>
                              );
                            })
                          }
                          <Button type="button" color="warning" onClick={this.addMedicationCondition}>Add record</Button>
                        </Col>
                      </FormGroup>
                    </CardBody>
                    <CardFooter>
                      <ButtonSubmit type="button" onClick={() => submitForm()} text="Submit" color="primary" />
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

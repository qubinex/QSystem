import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  CustomInput,
} from 'reactstrap';

class StudentRegistrationStep1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      isExistingUser: null,
    };
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

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { setEmail } = this.props;
    setEmail(value);
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm={{ size: 6, offset: 3 }}>
            <Form onSubmit={this.handleSubmit}>
              <Card>
                <CardHeader>
                  <strong>New registration</strong>
                </CardHeader>
                <CardBody>
                  <FormGroup>
                    <Label for="email">Enter applicant/guardian&#39;s email</Label>
                    <Input type="email" name="email" id="email" onChange={this.handleInputChange} placeholder="Email of applicant/ guardian" />
                  </FormGroup>
                  {/*
                  <FormGroup>
                    <CustomInput
                      type="radio"
                      id="existingUser"
                      name="existingUser"
                      label="Exisitng Academeet user/ new family member"
                      onChange={() => { this.setState({ isExistingUser: 1 }); }}
                    />
                    <CustomInput
                      type="radio"
                      id="nonExistingUser"
                      name="existingUser"
                      label="New user"
                      onChange={() => { this.setState({ isExistingUser: 0 }); }}
                    />
                  </FormGroup>
                  */}
                </CardBody>
                <CardFooter>
                  <Button color="primary" type="submit" className="pull-right">
                    Next step
                    {' '}
                    <i className="fa fa-arrow-circle-right" />
                  </Button>
                </CardFooter>
              </Card>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default StudentRegistrationStep1;

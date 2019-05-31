import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Label,
  Row,
  Form,
  FormGroup,
  Input,
} from 'reactstrap';
import Axios from 'axios';
import ButtonSubmit from '../../_common/component/buttonSubmit';

class ExistingUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      email: '',
      name: '',
      contactLast4Digits: '',
      isCreateFamilyMember: null,
      isReadytoSubmit: false,
      isSearching: false,
    };
    this.myForm = React.createRef();
  }

  searchExistingUser = () => {
    const { setDangerAlert, resetAlert } = this.props;
    resetAlert();
    this.setState({
      uid: '',
      name: '',
      isReadytoSubmit: false,
      isSearching: true,
    });
    Axios.post('/student/student/getExistingStudentDetail', this.state)
      .then((response) => {
        const data = response.data;
        if (data[0]) {
          this.setState({
            uid: data[0].id,
            name: `${data[0].first_name}, ${data[0].last_name}`,
            isReadytoSubmit: true,
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

  setAndSubmit = (createFamily) => {
    this.setState({ isCreateFamilyMember: createFamily },
      () => { this.myForm.current.submit(); });
  }

  handleSubmit = (event) => {
    console.log('check');
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
    const { isReadytoSubmit, isSearching, uid, email, name, contactLast4Digits } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm={{ size: 6, offset: 3 }}>
            <Form onSubmit={this.handleSubmit} ref={this.myForm}>
              <Card>
                <CardHeader>
                  <strong>Find existing user</strong>
                </CardHeader>
                <CardBody>
                  <FormGroup row>
                    <Label for="email" sm={4}>Email</Label>
                    <Col sm={8}>
                      <Input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={this.handleInputChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="last4Digit" sm={4}>Contact last 4 digit</Label>
                    <Col sm={8}>
                      <Input
                        type="text"
                        name="contactLast4Digits"
                        id="contactLast4Digits"
                        placeholder="Contact last 4 digits"
                        required
                        maxLength="4"
                        value={contactLast4Digits}
                        onChange={this.handleInputChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="last4Digit" sm={4}>UID</Label>
                    <Col sm={8}>
                      <Input type="text" name="uid" id="uid" placeholder="UID" readOnly value={uid} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="last4Digit" sm={4}>Name</Label>
                    <Col sm={8}>
                      <Input type="text" name="name" id="name" placeholder="Name" readOnly value={name} />
                    </Col>
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <Button
                    color="warning"
                    type="button"
                    className="pull-right"
                    onClick={() => this.setAndSubmit(false)}
                    disabled={!isReadytoSubmit}
                  >
                    Class assignment
                    {' '}
                    <i className="fa fa-calendar" />
                  </Button>
                  {' '}
                  <Button
                    color="primary"
                    type="button"
                    className="pull-right"
                    onClick={() => this.setAndSubmit(true)}
                    disabled={!isReadytoSubmit}
                  >
                    New family member
                    {' '}
                    <i className="fa fa-child" />
                  </Button>
                  <ButtonSubmit
                    type="button"
                    size=""
                    color="success"
                    text="Get user"
                    isSaving={isSearching}
                    onClick={this.searchExistingUser}
                    className="pull-left"
                  />
                </CardFooter>
              </Card>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ExistingUser;

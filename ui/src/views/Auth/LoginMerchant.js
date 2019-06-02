import React, { Component } from 'react';
import { Alert, Form, Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Spinner } from 'reactstrap';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isSaving: false,
      errorMsg: '',
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    const { history } = this.props;
    this.setState({ isSaving: true, errorMsg: '' });
    event.preventDefault();
    axios.post('/auth/loginMerchant', this.state, { withCredentials: true })
      .then((response) => {
        return history.push('/Merchant/Main');
      })
      .catch((error) => {
        // history.push('/login')
        this.setState({ errorMsg: error.response.data });
        // console.log(error);
      })
      .finally(() => {
        this.setState({ isSaving: false });
      });
  }

  render() {
    const { isSaving, errorMsg } = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Merchant login</p>
                      {
                        errorMsg !== '' ? <Alert color="info">{errorMsg}</Alert> : undefined
                      }
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="username" placeholder="Username" onChange={this.handleInputChange} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" name="password" placeholder="Password" onChange={this.handleInputChange} />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" type="submit">
                            {isSaving ? <Spinner color="light" type="grow" size="sm" /> : 'Save'}
                          </Button>
                          
                        </Col>
                        <Col xs="6">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-warning py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;

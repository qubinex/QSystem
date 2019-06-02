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

  componentDidMount() {
    this.loadFBLoginAPI();
  }

  loadFBLoginAPI = () => {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId      : '2375778252484998',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.3'
      });

      window.FB.AppEvents.logPageView();
      
    };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  checkLoginState() {
    window.FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    }.bind(this));
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
    axios.post('/auth/login', this.state, { withCredentials: true })
      .then((response) => {
        return history.push('/');
      })
      .catch((error) => {
        // history.push('/login')
        this.setState({ errorMsg: error.response.data });
        this.setState({ isSaving: false });
        // console.log(error);
      })
  }

  statusChangeCallback = (response) => {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {
      const { history } = this.props;
      window.FB.api('/me?fields=name,email', (response) => {
        console.log(response)
        axios.post('/auth/verifyFacebookLogin', { response })
        .then((response) => {
          return history.push('/');
        })
        .catch((err) => {
          this.setState({ isSaving: false });
        })
      });
      // this.testAPI();
      console.log('connected');
    } else if (response.status === 'not_authorized') {
      this.setState({ errorMsg: "Please log into this app." });
      // console.log("Please log into this app.");
    } else {
      this.setState({ errorMsg: "Please log into this facebook." });
      // console.log("Please log into this facebook.");
    }
  }

  checkLoginState = () => {
    window.FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    }.bind(this));
  }

  handleFBLogin = () => {
    console.log('handlefblogin')
    window.FB.login(this.checkLoginState(), {
      scope: 'email',
      return_scopes: true
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
                      <p className="text-muted">Sign In to your account</p>
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
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Signin with facebook</h2>
                      <br />
                      <div>
                        {/* <div className="fb-login-button" data-width="" data-size="medium" data-button-type="continue_with" data-auto-logout-link="false" data-use-continue-as="true" > */}                          
                      
                      </div>
                      <Button className="btn-facebook btn-brand" color="primary" onClick={this.handleFBLogin}>
                        <i className="fa fa-facebook" /> <span>Continue with facebook</span>
                      </Button>
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

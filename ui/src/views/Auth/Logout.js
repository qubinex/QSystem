import { Component } from 'react';
import axios from 'axios';
// import { Redirect } from 'react-router';
import Auth from '../../utils/auth';

class Login extends Component {
  componentWillMount() {
    const { history } = this.props;
    axios.post('/logout')
      .then((response) => {
        // console.log(response);
        // console.log(response.status);
        // if (response.status === 200) {
        Auth.deauthenticateUser();
        return history.push('/login');
        // }
      })
      .catch((error) => {
        // console.log(error);
      });
  }

  render() {
    return null;
  }
}

export default Login;

import Axios from 'axios';
import decode from 'jwt-decode';


class Auth {
  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  static authenticateUser(token) {
    localStorage.setItem('token', token);
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    const isValid = this.validateToken();
    return isValid;
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static deauthenticateUser() {
    // this.userHasAuthenticated(false);
    localStorage.removeItem('jwt');
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */

  static getToken() {
    return localStorage.getItem('jwt');
  }

  static validateToken() {
    let isValidToken = false;
    try {
      const decoded = decode(Auth.getToken());
      if (decoded.expires > Date.now()) {
        // Checking if token is expired.
        isValidToken = true;
      }
    } catch (err) {
      isValidToken = false;
    }
    return isValidToken;
  }

  static async validateTokenFromServer() {
    let isValidToken = null;

    await Axios.post('/auth/verifyToken')
      .then((response) => {
        // console.log('response after verify: ' + response.status);
        isValidToken = this._checkValidStatus(response.status);
      })
      .catch((error) => {
        // console.log(error);
        throw error;
        // console.log(error);
      });
    return isValidToken;
  }

  static _checkValidStatus(response) {
    // let isValid = true;
    // raises an error in case response status is not a success
    // Success status lies between 200 to 300
    if (!(response >= 200 && response < 300)) {
      // console.log(' checkValidstatus error ')
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
    return response;
  }
}

export default Auth;

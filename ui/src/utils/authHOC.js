import React from 'react';
import { Redirect } from 'react-router-dom';

// Authentication
import Auth from './auth';

const RequireAuth = (Component, category) => {
  return class App extends Component {
    state = {
      isAuthenticated: false,
      isLoading: true,
      isAlertVisible: true,
      alertText: 'Default error msg',
      alertType: 'success',
    }

    componentDidMount() {
      this.resetAlert();
      Auth.validateTokenFromServer()
        .then(() => {
          this.setState({ isAuthenticated: true });
        }).catch((err) => {
          this.setDangerAlert(true, err.response.data);
          // console.log(err)
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }

    resetAlert = () => {
      this.setState({
        isAlertVisible: false,
        alertText: '',
      });
    }

    toggleAlert = () => {
      const { isAlertVisible } = this.state;
      this.setState({ isAlertVisible: !isAlertVisible });
    }

    setDangerAlert = (isVisible, text) => {
      this.setAlertVisible(isVisible, text, 'danger');
    };

    setSuccessAlert = (isVisible, text) => {
      this.setAlertVisible(isVisible, text, 'success');
    };

    setInfoAlert = (isVisible, text) => {
      this.setAlertVisible(isVisible, text, 'info');
    };

    setAlertVisible = (isVisible, text, type) => {
      this.setState({
        isAlertVisible: isVisible,
        alertText: text,
        alertType: type,
      });
    };

    getStatusIcon = (status) => {
      let icon = '';
      if (status === 'success') {
        icon = <i className="fa fa-check" />;
      } else if (status === 'danger') {
        icon = <i className="fa fa-minus-circle" />;
      }
      return icon;
    }

    render() {
      const { isAuthenticated, isLoading } = this.state;
      if (isLoading) {
        return <div>Loading...</div>;
      }
      if (!isAuthenticated) {
        return <Redirect to="/login" />;
      }
      return (
        <Component
          {...this.props}
          {...this.state}
          category={category}
          resetAlert={this.resetAlert}
          setDangerAlert={this.setDangerAlert}
          setSuccessAlert={this.setSuccessAlert}
          setInfoAlert={this.setInfoAlert}
          toggleAlert={this.toggleAlert}
          getStatusIcon={this.getStatusIcon}
        />
      );
    }
  };
};

export default RequireAuth;

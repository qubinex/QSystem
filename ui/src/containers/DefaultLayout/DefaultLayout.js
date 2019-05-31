import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container, Alert } from 'reactstrap';
import axios from 'axios';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';

// routes config
import routes from '../../routes';
import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';

/* eslint-disable react/prefer-stateless-function */
class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigations: { items: [] },
      headers: [],
    };
  }

  componentDidMount() {
    this.getNavigationComponent('home');
  }

  getNavigationComponent = (category) => {
    // navigation panel will now get from server side
    axios.post('/auth/getNavigationOnUserRole', { category })
      .then((response) => {
        const { data } = response;
        console.log(data);
        const { component, headers } = data;
        this.setState({ navigations: component, headers });
      })
      .catch(() => (<Redirect to="/logout" />))
      .finally(() => {
        // 
      });
  }

  render() {
    const { isAlertVisible, alertText, setAlertVisible, alertType, toggleAlert, getStatusIcon } = this.props;
    const { navigations, headers } = this.state;
    return (
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader headers={headers} getNavigationComponent={this.getNavigationComponent} />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={navigations} {...this.props} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} />
            <Container fluid>
              <Alert color={alertType} isOpen={isAlertVisible} toggle={() => toggleAlert()}>
                {getStatusIcon(alertType)}
                {' '}
                {alertText}
              </Alert>
              <Switch>
                {
                  routes.map((route, idx) => {
                    return route.component ? (
                      <Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (<route.component {...props} {...this.props} />)} />
                    ) : (null);
                  })
                }
                <Redirect exact from="/school" to="/School/Academy/Schedule" />
                <Redirect exact from="/employee" to="/employee" />
                <Redirect exact from="/analytic" to="/analytic" />
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Container>
          </main>
          <AppAside fixed hidden>
            <DefaultAside />
          </AppAside>
        </div>
        <AppFooter>
          <DefaultFooter />
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;

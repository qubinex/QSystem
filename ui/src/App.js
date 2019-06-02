import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './scss/style.css';

// Containers
import { DefaultLayout } from './containers';
// import PrivateRoute from './utils/privateRoute';
import RequireAuth from './utils/authHOC';
// Pages
import { Page404, Page500, Register } from './views/Pages';
import Login from './views/Auth/Login';
import LoginMerchant from './views/Auth/LoginMerchant';
import Logout from './views/Auth/Logout';

// import { renderRoutes } from 'react-router-config';

function App(props) {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/login" name="Login Page" component={Login} />
        <Route exact path="/loginMerchant" name="Merchant login Page" component={LoginMerchant} />
        <Route exact path="/logout" name="Logout" component={Logout} />
        <Route exact path="/register" name="Register Page" component={Register} />
        <Route exact path="/404" name="Page 404" component={Page404} />
        <Route exact path="/500" name="Page 500" component={Page500} />
        {/* <PrivateRoute path="/" name="Home" component={DefaultLayout} /> */}
        <Route path="/" name="Home" component={RequireAuth(DefaultLayout, 'main')} />
      </Switch>
    </HashRouter>
  );
}

export default App;

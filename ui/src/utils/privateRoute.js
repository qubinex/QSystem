import React from 'react';
import { Redirect, Route } from 'react-router-dom';
// Authentication
import Auth from './auth';
import Context from './context';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Context.Provider value={8}>
      <Route
        {...rest}
        render={props => (
          Auth.isUserAuthenticated() ? (
            <Component {...props} />
          ) : (
            <Redirect to={{
              pathname: '/login',
              state: { from: props.location },
            }}
            />
          )
        )}
      />
    </Context.Provider>
  );
};

export default PrivateRoute;

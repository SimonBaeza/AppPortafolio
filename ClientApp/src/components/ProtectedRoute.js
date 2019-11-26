import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Session from './auth/Session';

export default function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (Session.isUserAuthenticated()) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location }
              }}
            />
          );
        }
      }}
    />
  );
}
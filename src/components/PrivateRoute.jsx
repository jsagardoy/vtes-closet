import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PageDeniedAccess from './PageDeniedAccess';

const PrivateRoute = ({ isLogged, component: Component, ...rest }) => {
  return (
    <Route {...rest}>{isLogged ? <Component /> : <PageDeniedAccess />}</Route>
  );
};

export default PrivateRoute;

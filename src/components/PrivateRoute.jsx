import React from 'react';
import { Route } from 'react-router-dom';
import PageDeniedAccess from './PageDeniedAccess';
import {getSessionStorageAuth} from '../util/helpFunction';

const PrivateRoute = ({ isLogged, component: Component, ...rest }) => (
  <Route {...rest}>
        {(isLogged && getSessionStorageAuth()) ? <Component /> : <PageDeniedAccess />}
  </Route>
);

export default PrivateRoute;

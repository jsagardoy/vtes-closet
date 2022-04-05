import React from 'react';
import { Route } from 'react-router-dom';
import PageDeniedAccess from './PageDeniedAccess';
import {getLocalStorageAuth} from '../util/helpFunction';

const PrivateRoute = ({ isLogged, component: Component, ...rest }) => (
  <Route {...rest}>
        {(isLogged && getLocalStorageAuth()) ? <Component /> : <PageDeniedAccess />}
  </Route>
);

export default PrivateRoute;

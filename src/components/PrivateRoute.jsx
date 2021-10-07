import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PageNotFound from './PageNotFound';


const PrivateRoute = ({ isLogged, component: Component, ...rest }) => {
    return (<Route {...rest}>{isLogged ? <Component />:<PageNotFound />}</Route>)
}

export default PrivateRoute;
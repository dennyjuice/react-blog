import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Routes } from '../../helpers/constants';

const PrivateRoute: React.FC<RouteProps> = ({ component: Component, ...rest }) => {
  const { isLogged } = useTypedSelector((state) => state.user);
  return (
    <Route {...rest} render={(props) => (isLogged ? <Component {...props} /> : <Redirect to={Routes.SIGN_IN} />)} />
  );
};

export default PrivateRoute;

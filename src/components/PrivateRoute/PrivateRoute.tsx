import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Routes } from '../../helpers/constants';

const PrivateRoute: React.FC<{ component: any; [propName: string]: any }> = ({ component: Component, ...rest }) => {
  const { isLogged } = useTypedSelector((state) => state.user);
  return (
    <Route {...rest} render={(props) => (isLogged ? <Component {...props} /> : <Redirect to={Routes.SIGN_IN} />)} />
  );
};

export default PrivateRoute;

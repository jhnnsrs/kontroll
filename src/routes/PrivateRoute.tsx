import * as React from 'react';
import { Redirect, Route, RouteProps, useLocation } from 'react-router';
import { useAuth } from '../contexts/auth/auth-context';
import { Login } from '../pages/Login';

export const PrivateRoute = (props: any) => {
  let { component, ...options} = props
  const [auth, methods ]= useAuth();
  const finalComponent = auth.isAuthenticated ? component : Login;

  return <Route {...options} component={finalComponent} />;
};
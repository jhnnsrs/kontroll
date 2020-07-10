import * as React from 'react';
import { Route, RouteProps } from 'react-router';
import { useAuth } from '../contexts/auth/auth-context';
import { Login } from '../pages/Login';
import { useBergen } from '../contexts/bergen/bergen-context';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';

function withProvider<T>(client: ApolloClient<NormalizedCacheObject>, Component: React.ComponentType<T>) {
  return (props: T) => (
      <ApolloProvider client={client}>
        <Component {...props} />
      </ApolloProvider>
    );
}




export function BergenRoute<T extends RouteProps>(props: T){
  let { component, ...options} = props as { component: React.ComponentType<T>}
  const [bergenState, ]= useBergen();
  const finalComponent = bergenState.client ? withProvider<T>(bergenState.client,component) : Login;
  console.log("Rerender")
  return <Route {...options} component={finalComponent} />;
};
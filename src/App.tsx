import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router';
import { PrivateRoute } from './routes/PrivateRoute';
import { Login } from './pages/Login';
import { Landing } from './pages/Landing';
import { Home } from './pages/Home';
import { OAuthCallback } from 'react-oauth2-hook';
import { AuthProvider } from './contexts/auth/auth-provider';
import { useAuth } from './contexts/auth/auth-context';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient  from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  request: (operation) => {
    const token = localStorage.getItem('token')
    console.log("Authenticating with token",token)
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  }
});



const App: React.FC = () => {
  const [auth, methods] = useAuth()

  return (
    <div>
      <Switch>
      <ApolloProvider client={client}>
        <AuthProvider>
          <PrivateRoute exact={true} path='/' component={Landing} />
          <PrivateRoute path='/home' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/callback' component={OAuthCallback} />
        </AuthProvider>
      </ApolloProvider>
      </Switch>
    </div>
  )
}

export default App

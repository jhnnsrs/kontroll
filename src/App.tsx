import { ClientContext, GraphQLClient } from 'graphql-hooks';
import React from 'react';
import { OAuthCallback } from 'react-oauth2-hook';
import { Route, Switch } from 'react-router';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { AuthProvider } from './contexts/auth/auth-provider';
import { Home } from './pages/Home';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { PrivateRoute } from './routes/PrivateRoute';



const client = new GraphQLClient({
  url: 'http://localhost:8000/graphql',
  subscriptionClient: new SubscriptionClient('ws://localhost:8000/graphql/', {
    /* additional config options */
  })
})



const App: React.FC = () => {
  return (
    <div>
      <Switch>
      <ClientContext.Provider value={client}>
        <AuthProvider>
          <PrivateRoute exact={true} path='/' component={Landing} />
          <PrivateRoute path='/home' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/callback' component={OAuthCallback} />
        </AuthProvider>
      </ClientContext.Provider>
      </Switch>
    </div>
  )
}

export default App

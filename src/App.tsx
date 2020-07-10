import React from 'react';
import { OAuthCallback } from 'react-oauth2-hook';
import { Route, Switch } from 'react-router';
import { AuthProvider } from './contexts/auth/auth-provider';
import { Home } from './pages/Home';
import { Landing } from './pages/Landing';
import { ExcecutorPage } from './pages/Executor';
import { Login } from './pages/Login';
import { GraphPage } from './pages/Graph';
import { TestNode } from './pages/TestNode';
import { Dashboard } from './pages/Dashboard';
import { Header } from './components/header/Header';
import { BergenProvider } from './contexts/bergen/bergen-provider';
import { BergenRoute } from './routes/BergenRoute';



const App: React.FC = () => {
  return (
    <>
      <BergenProvider>
        <AuthProvider>
            <Header/>
            <Switch>
              <BergenRoute exact={true} path='/' component={Landing} />
              <BergenRoute path='/home' component={Home} />
              <BergenRoute path='/graph' component={GraphPage} />
              <BergenRoute path='/excecutor' component={ExcecutorPage} />
              <BergenRoute path='/test' component={TestNode} />
              <BergenRoute path='/dashboard/:reference' component={Dashboard} />
              <Route path='/login' component={Login} />
              <Route path='/callback' component={OAuthCallback} />
            </Switch>
        </AuthProvider>
      </BergenProvider>
 </>
  )
}


export default App

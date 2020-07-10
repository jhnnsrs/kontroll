import React from 'react';
import { useAuth } from '../contexts/auth/auth-context';



export const Home = (props : any) => {
  console.log(props)
  const [auth, methods] = useAuth();
  return (
    <div>
        token: {auth.token} sonfoisneofinsef
      <b onClick={() => methods.logout()}>Logout</b>
    </div>
  );
};
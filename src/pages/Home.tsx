import React, {useContext} from 'react';
import {AuthContext} from '../contexts/auth/auth-context';


export const Home = () => {
  const [auth, methods] = useContext(AuthContext);
  return (
    <div>
            token: {auth.token}
      <b onClick={() => methods.logout()}>Logout</b>
    </div>
  );
};
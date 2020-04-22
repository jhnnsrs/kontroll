import React, { useContext } from 'react';
import { AuthContext } from '../contexts/auth/auth-context';


export const Login = () => {
  const [auth, methods] = useContext(AuthContext);

  return (
    <div>
            token: {auth.token}
      <b onClick={() => methods.login()}>Login with Bergen</b>
    </div>
  );
};
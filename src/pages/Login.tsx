import React, {useContext} from 'react';
import {AuthContext} from '../contexts/auth/auth-context';
import { useSession } from '../contexts/session/session-context';
import { useHistory } from 'react-router-dom';


export const Login = () => {
  const [auth, methods] = useContext(AuthContext);

  return (
    <div>
            token: {auth.token}
      <b onClick={() => methods.login()}>Login with Bergen</b>
    </div>
  );
};
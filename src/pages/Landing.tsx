import React, {useContext} from 'react';
import {AuthContext} from '../contexts/auth/auth-context';
import { Link } from 'react-router-dom';


export const Landing = () => {
  return (
    <div>
       Welcome to Trontheim
       <Link to="/login">Login</Link>
    </div>
  );
};
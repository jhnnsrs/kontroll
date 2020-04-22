import React from 'react';
import { Link } from 'react-router-dom';


export const Landing = () => {
  return (
    <div>
       Welcome to Trontheim
       <Link to="/login">Login</Link>
    </div>
  );
};
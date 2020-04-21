import React, {useContext, useEffect} from 'react';
import {AuthContext, useAuth} from '../contexts/auth/auth-context';
import ApolloClient, { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

interface Job {
  pod: number;
}

interface JobVars {
}

const jobQuery = gql`
    query {
      allJobs{
        instance
    }
  }
`


export const Home = () => {
  const [auth, methods] = useAuth();
  const {loading, data, error} = useQuery<Job,JobVars>(jobQuery)

  return (
    <div>
      {loading ? (
        <p>Loading ...</p>
      ) : ""}
      {error ? (
        <p>Error {JSON.stringify(error)}</p>
      ) : ""}
            token: {auth.token}
            {JSON.stringify(data)}
      <b onClick={() => methods.logout()}>Logout</b>
    </div>
  );
};
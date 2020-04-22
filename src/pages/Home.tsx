import { useManualQuery, useSubscription } from 'graphql-hooks';
import gql from "graphql-tag";
import { print } from 'graphql/language/printer';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/auth/auth-context';

interface Job {
  event: string;
  args: any
}

interface Representation {
  id: 1
  store: string
}

interface RepresentationQuery {
  rep: Representation
}

interface JobVars {
}



const JOB_SUBSCRIPTION = gql`
  subscription NewJob($podid: Int!, $instanceid: Int!) {
    job: allJobs(podid: $podid, instanceid: $instanceid) {
    event
    args
  }
  }
`
const GET_REPRESENTATION = gql`
  query getRep($id: Int!) {
    rep: Representation(id: $id){
      id
      store
    }
  }


`



export const Home = () => {
  const [auth, methods] = useAuth();
  const [job, setJob] = useState<Job>()
  const [fetchRepresentation, { data }] = useManualQuery<RepresentationQuery>(print(GET_REPRESENTATION))

  async function jobIn(job: Job) {
      await fetchRepresentation({ variables: { id: job.args.rep}}).then(result => console.log(result))
  }


  useSubscription({ query: print(JOB_SUBSCRIPTION), variables: { podid: 5, instanceid: 3}}, (response) => {
      if (response.data) {
          setJob(response.data.job)
          jobIn(response.data.job)
      }
      else {
        console.error(response)
      }
  })

  useEffect( () => {
    if (job) {
      
    }

  },[job])

  return (
    <div>
        token: {auth.token} sonfoisneofinsef
        {job && job.args.rep}
        {data && data.rep.store}
      <b onClick={() => methods.logout()}>Logout</b>
      <b onClick={() => {if (job) jobIn(job)}}>Fetch Rep</b>
    </div>
  );
};
import React from 'react';
import { useAuth } from '../contexts/auth/auth-context';
import { Provision } from '../components/dashboard/provision';
import { Card } from 'react-bootstrap';



export const Dashboard = (props: any) => {
  let reference = props.match.params.reference
  return (
    <div>
      <Card>
      <Provision reference={reference}/>
      </Card>
    </div>
  );
};
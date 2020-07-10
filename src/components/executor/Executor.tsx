import React from 'react';
import { Link } from 'react-router-dom';
import { FlowProvider } from '../../contexts/flow/flow-provider';
import { FlowDisplay} from "./FlowDisplay"
import { CreateFlow } from './CreateFlow';

export const Excecutor = () => {
  return (
      <FlowProvider>
            <FlowDisplay/>
            <CreateFlow/>
    </FlowProvider>
  );
};
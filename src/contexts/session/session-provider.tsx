import { createContext, useContext, useState } from 'react';
import { initialSession, Session } from './session-model';
import { SessionContext } from './session-context';
import React from 'react';


export const SessionContextProvider: React.FC = (props) => {
    const [sessionState, setSessionState] = useState(initialSession);
    const defaultSessionContext: [Session, typeof setSessionState]  = [sessionState, setSessionState];
  
    return (
      <SessionContext.Provider value={defaultSessionContext}>
        {props.children}
      </SessionContext.Provider>
    );
  }
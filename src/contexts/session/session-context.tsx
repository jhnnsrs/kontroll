import { createContext, useContext, useState } from 'react';
import { Session, initialSession} from "./session-model"
import React from 'react';

export const SessionContext = createContext<[Session, (session: Session) => void]>([initialSession, () => {}]);
export const useSession = () => useContext(SessionContext);
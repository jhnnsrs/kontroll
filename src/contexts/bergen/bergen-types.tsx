import { ApolloClient } from 'apollo-client';
import {  NormalizedCacheObject } from 'apollo-cache-inmemory';

export type Scopes = 
  | "read"
  | "CAN_READ"
  | "CAN_PARSE"
  | "CAN_HOST_POD"
  | "CAN_PROVIDE_POD"



export type Provider = {
    clientID: string,
    scope: Scopes[],
    authorizeUrl: string,
    redirectUri: string,
    graphUri: string,
    websocketUri: string,
    name: string,
}


export type User = {
  name: string
}

export type Token = string

export type BergenState = {
    client: ApolloClient<NormalizedCacheObject> | null,
    available: Provider[],
    chosen: Provider | null,
    current: Provider | null,
    token: Token | null,
    user: User | null,
    default: Provider
}
 
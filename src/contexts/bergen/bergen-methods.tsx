import useMethods from 'use-methods'
import { Provider, BergenState, Token, User} from './bergen-types'
import { ApolloClient } from 'apollo-client';
import {  NormalizedCacheObject } from 'apollo-cache-inmemory';



const redirectUri = window.location.origin +"/callback"
 
export const bergenState: BergenState = { 
  token: "",
  chosen: null,
  user: null,
  client: null,
  current: null,
  available: [
    {
      name: "Fremmed",
      graphUri: "http://localhost:8000/graphql",
      websocketUri: "ws://localhost:8000/graphql/",
      authorizeUrl: "http://localhost:8000/o/authorize",
      scope: ["read"],
      clientID: "NYGOhGOeIZLNd2zl8PK99voteHz7hI6ciuQSwOf3",
      redirectUri: redirectUri
    },
    {
      name: "Localhost",
      authorizeUrl: "http://localhost:8000/o/authorize",
      graphUri: "http://localhost:8000/graphql",
      websocketUri: "ws://localhost:8000/graphql/",
      scope: ["read"],
      clientID: "NYGOhGOeIZLNd2zl8PK99voteHz7hI6ciuQSwOf3",
      redirectUri: redirectUri
    },
  ],
  default: {
    name: "Default",
    graphUri: "http://localhost:8000/graphql",
    websocketUri: "ws://localhost:8000/graphql/",
    authorizeUrl: "http://localhost:8000/o/authorize",
    scope: ["read"],
    clientID: "NYGOhGOeIZLNd2zl8PK99voteHz7hI6ciuQSwOf3",
    redirectUri: redirectUri
  }
}

const methods = (state: BergenState) => ({
      setChosen(provider: Provider) {
        state.chosen = provider;
      },
      setCurrent(provider: Provider | null) {
        state.current = provider;
      },
      setToken(token: Token | null){
        state.token = token
      },
      setClient(client: ApolloClient<NormalizedCacheObject> | null) {
        state.client = client
      },
      setUser(user: User){
        state.user = user
      }
    })


export const useBergenMethods = () => useMethods(methods, bergenState)
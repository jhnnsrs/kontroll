import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../../generated/fragmentTypes.json';
import { Token } from '../auth/auth-types';
import { Provider } from '../bergen/bergen-types';
import { setContext } from 'apollo-link-context';


  
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});


const cache = new InMemoryCache({ fragmentMatcher });

export const generateBergenClient = (provider: Provider, token: Token | null) => {
    console.log("Creating Balder Client", provider, token)
    let httpLink = new HttpLink({
        uri: provider?.graphUri
      });

    let authLink = setContext((_, { headers }) => {
        // get the authentication token from local storage if it exists
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
          }
        }
      });
  
    // Only apply our subscription client when the user is logged in
    let wsLink = new WebSocketLink({
            uri: provider?.websocketUri,
            options: {
              lazy: true,
            reconnect: true,
            connectionParams: () => ({
                headers: {
                'Authorization': token,
                },
                authToken: token
            }),
            }
        })

        
    let link = split(
        // split based on operation type
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
            );
        },
        wsLink,
        authLink.concat(httpLink),
        );

  
    
    const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
        cache,
        link: link,
      });
  
    return apolloClient;
  };
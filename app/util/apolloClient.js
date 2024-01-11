import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
} from '@apollo/client';

import {onError} from '@apollo/client/link/error';
import apolloLogger from 'apollo-link-logger';

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: 'http://localhost:8000/graphql',
  cache: cache,
});

const errorLink = onError(
  ({graphqlErrors, networkError, operation, response}) => {
    if (graphqlErrors) {
      graphqlErrors.map(({message, locations, path}) =>
        console.warn(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    }

    if (networkError) {
      console.warn(`[operation]: ${JSON.stringify(operation)}`);
      console.warn(`[response]: ${JSON.stringify(response)}`);
      console.warn(`[Network error]: ${networkError}`, new Error().stack);
    }
  },
);

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([errorLink, apolloLogger, httpLink]),
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  },
  queryDeduplication: false,
});

// with a server response, return data if exists, else return errors
const parseResponse = (res, key) => {
  if (!res.errors && res.data[key]) {
    return res.data[key];
  }
  return res.errors && res.errors[0].message
    ? res.errors[0].message
    : 'NO DATA';
};

export {client, parseResponse};

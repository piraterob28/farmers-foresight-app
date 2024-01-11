/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {ApolloProvider} from '@apollo/client/main.cjs';
import {client} from './app/util/apolloClient';

const WrappedApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => WrappedApp);

import React from 'react';
import Navigator from './navigation/Navigator';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {MainProvider} from './contexts/MainContext';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://192.168.1.142:4000/graphql',
  cache: new InMemoryCache(),
});
const App = () => {
  return (
    <ApolloProvider client={client}>
      <MainProvider>
        <Navigator />
      </MainProvider>
    </ApolloProvider>
  );
};

export default App;

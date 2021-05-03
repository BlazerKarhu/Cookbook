import React from 'react';
import Navigator from './navigation/Navigator';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {MainProvider} from './contexts/MainContext';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://jtm-sssf.jelastic.metropolia.fi/',
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

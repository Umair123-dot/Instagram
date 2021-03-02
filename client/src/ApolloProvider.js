import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client'
import { ApolloProvider } from '@apollo/client';
import App from './App';
import { setContext } from '@apollo/client/link/context';
import AUTH_TOKEN from './constant';
import { AuthProvider } from './context';

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(AUTH_TOKEN);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(
    createUploadLink({
      uri: '/graphql'
    })
  ),
  cache: new InMemoryCache()
});



export default (
  <ApolloProvider client={client}>
    <AuthProvider>
      <App />
    </AuthProvider>

  </ApolloProvider>
)
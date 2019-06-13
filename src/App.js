import React, { useReducer } from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from 'react-apollo';
import { Router } from '@reach/router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBaby } from '@fortawesome/free-solid-svg-icons'

import AppContext from './context/appContext';
import appReducer, { initialState } from './context/appReducer';
import Login from './views/Login';
import Home from './views/Home';

library.add(faBaby);

const uri = process.env.NODE_URL || 'http://localhost:4000';
const httpLink = new HttpLink({ uri });
const authLink = setContext(async (req, { headers }) => {
  const token = await localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});
const link = authLink.concat(httpLink);
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <ApolloProvider client={client}>
      <AppContext.Provider value={{ state, dispatch }}>
        <Router>
          <Login path='/' />
          <Home path='/home' />
        </Router>
      </AppContext.Provider>
    </ApolloProvider>
  );
}

export default App;

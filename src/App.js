import React, { useReducer } from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from 'react-apollo';
import { Router } from '@reach/router';

import AppContext from './context/appContext';
import appReducer, { initialState } from './context/appReducer';
import Login from './views/Login';

const httpLink = new HttpLink({ uri: 'https://blooming-badlands-62833.herokuapp.com/' });
const authLink = setContext(async (req, { headers }) => {
  const token = await localStorage.getItem('token');
  return {
    ...headers,
    headers: {
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
          <Login path="/" />
        </Router>
      </AppContext.Provider>
    </ApolloProvider>
  );
}

export default App;

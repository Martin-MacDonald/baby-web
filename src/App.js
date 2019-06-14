import React, { useReducer } from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
import { setContext } from 'apollo-link-context';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Router, Redirect } from '@reach/router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBaby } from '@fortawesome/free-solid-svg-icons';

import AppContext from './context/appContext';
import appReducer, { initialState } from './context/appReducer';
import Loading from './views/Loading';
import Login from './views/Login';
import Home from './views/Home';
import AuthContainer from './views/AuthContainer';

library.add(faBaby);

const uri = process.env.REACT_APP_API || 'http://localhost:4000';
const httpLink = new HttpLink({ uri });
const authLink = setContext((req, { headers }) => {
  const token = localStorage.getItem('token');
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

const CHECK_LOGIN_QUERY = gql`
  query {
    checkLogin
  }
`;

const AuthRoute = ({ component: Component, ...rest }) => (
  <Query query={CHECK_LOGIN_QUERY}>
    {({ loading, error, data }) => {
      if (loading) return (
        <AuthContainer>
          <Loading />
        </AuthContainer>
      );
      if (error) return `Error! ${error.message}`;
      if (!data.checkLogin) return <Redirect noThrow to='/' />
      return (
        <AuthContainer>
          <Component {...rest} />
        </AuthContainer>
      );
    }}
  </Query>
);

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <ApolloProvider client={client}>
      <AppContext.Provider value={{ state, dispatch }}>
        <Router>
          <Login path='/' />
          <AuthRoute component={Home} path='/home' />
        </Router>
      </AppContext.Provider>
    </ApolloProvider>
  );
}

export default App;

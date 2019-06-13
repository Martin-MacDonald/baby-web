/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useState, useEffect } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';

const loginStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #CABAC8;
  svg {
    &.userIcon {
      font-size: 50px;
      margin-bottom: 20px;
      color: black;
    }
  }
  form {
    input:not(last-of-type) {
      margin-bottom: 15px;
    }
  }
`;

const CHECK_LOGIN_QUERY = gql`
  query($token: String!) {
    checkLogin(token: $token)
  }
`;

const LOGIN_QUERY = gql`
  query($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Login = ({ client, navigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await client.query({
          query: CHECK_LOGIN_QUERY,
          variables: { token },
        });
        if (res.data.checkLogin) {
          navigate('home');
        }
      } catch (err) {
        console.log(err);
      }
    })();
  });

  const onLogin = async () => {
    try {
      setLoading(true);
      const res = await client.query({
        query: LOGIN_QUERY,
        variables: { email, password },
      });
      const { token } = res.data.login;
      localStorage.setItem('token', token);
      navigate('home');
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      css={loginStyle}
      className='container'
    >
      <form
        onSubmit={e => {
          e.preventDefault();
          onLogin();
        }}
      >
        <Input
          title='Email'
          type='email'
          placeholder='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={loading}
        />
        <Input
          title='Password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={loading}
        />
        <SubmitButton
          text={loading ? <FontAwesomeIcon icon='baby' /> : 'Login'}
          disabled={loading}
        />
      </form>
    </section>
  );
};

export default withApollo(Login);
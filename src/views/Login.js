/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useState } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';

const formStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  fieldset {
    margin-bottom: 10px;
  }
`;

const LOGIN_QUERY = gql`
  query($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Login = ({ client }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const onLogin = async () => {
    try {
      setLoading(true);
      const res = await client.query({
        query: LOGIN_QUERY,
        variables: { email, password },
      });
      console.log(res);
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className='container'
      css={formStyle}
      onSubmit={e => {
        e.preventDefault();
        onLogin();
      }}
    >
      <Input
        title='Email'
        type='text'
        value={email}
        onChange={e => setEmail(e.target.value)}
        disabled={loading}
      />
      <Input
        title='Password'
        type='text'
        value={password}
        onChange={e => setPassword(e.target.value)}
        disabled={loading}
      />
      <SubmitButton
        value={loading ? 'Loading...' : 'Login'}
        disabled={loading}
      />
    </form>
  );
};

export default withApollo(Login);
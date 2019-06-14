/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useState, useContext } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { Container, Row, Col, Form } from 'react-bootstrap';

import SubmitButton from '../components/SubmitButton';
import appContext from '../context/appContext';
import { SET_USER } from '../context/types';

const containerStyle = css`
  min-height: 100vh;
  display: flex;
  align-items: center;
  .row {
    flex-grow: 1;
  }
`;

const LOGIN_QUERY = gql`
  query($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name {
          firstName
        }
        parentType
      }
    }
  }
`;

const Login = ({ client, navigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(appContext);

  const onLogin = async () => {
    try {
      setLoading(true);
      const res = await client.query({
        query: LOGIN_QUERY,
        variables: { email, password },
      });
      const { token, user } = res.data.login;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: SET_USER, payload: user });
      navigate('home');
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container css={containerStyle}>
      <Row>
        <Col>
          <Form
            onSubmit={e => {
              e.preventDefault();
              onLogin();
            }}
          >
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={loading}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={loading}
              />
            </Form.Group>
            <SubmitButton
              text='Login'
              disabled={loading}
            />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default withApollo(Login);
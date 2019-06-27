/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import SubmitButton from './SubmitButton';
import { GET_NAMES_QUERY } from '../views/Names';

const ADD_NAME_MUTATION = gql`
  mutation($name: String!) {
    addName(name: $name)
  }
`;

const AddNameModal = ({ show, onHide, client }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const onAddName = async () => {
    try {
      setLoading(true);
      await client.mutate({
        mutation: ADD_NAME_MUTATION,
        variables: { name },
        refetchQueries: [{ query: GET_NAMES_QUERY }],
      });
      setTimeout(() => {
        onHide();
      }, 1);
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>{`Add Name`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={e => {
            e.preventDefault();
            onAddName();
          }}
        >
          <Form.Group>
            <Form.Label>Name *</Form.Label>
            <Form.Control
              type='text'
              value={name}
              onChange={e => setName(e.target.value)}
              disabled={loading}
            />
          </Form.Group>
          <SubmitButton
            text='Add'
            disabled={loading}
          />
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default withApollo(AddNameModal);
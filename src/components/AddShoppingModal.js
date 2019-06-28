/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import SubmitButton from './SubmitButton';
import { GET_SHOPPING_QUERY } from '../views/ShoppingList';

const ADD_SHOPPING_MUTATION = gql`
  mutation($shoppingItem: String!) {
    addShoppingItem(shoppingItem: $shoppingItem)
  }
`;

const AddShoppingModal = ({ show, onHide, client }) => {
  const [shoppingItem, setShoppingItem] = useState('');
  const [loading, setLoading] = useState(false);

  const onAddShopping = async () => {
    try {
      setLoading(true);
      await client.mutate({
        mutation: ADD_SHOPPING_MUTATION,
        variables: { shoppingItem },
        refetchQueries: [{ query: GET_SHOPPING_QUERY }],
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
        <Modal.Title>{`Add Shopping Item`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={e => {
            e.preventDefault();
            onAddShopping();
          }}
        >
          <Form.Group>
            <Form.Label>Item *</Form.Label>
            <Form.Control
              type='text'
              value={shoppingItem}
              onChange={e => setShoppingItem(e.target.value)}
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

export default withApollo(AddShoppingModal);
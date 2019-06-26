/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import SubmitButton from './SubmitButton';

const AddNameModal = ({ show, onHide, client }) => {
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);

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
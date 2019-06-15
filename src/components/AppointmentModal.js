/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import SubmitButton from './SubmitButton';
import moment from 'moment';

const AppointmentModal = ({ show, onHide, appointmentTypes }) => {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [appointmentType, setAppointmentType] = useState(appointmentTypes[0].type);
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(moment.now());
  return (
    <Modal
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>{`Add Appointment`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <Form.Group>
            <Form.Label>Appointment Description *</Form.Label>
            <Form.Control
              type='text'
              value={description}
              onChange={e => setDescription(e.target.value)}
              disabled={loading}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Type *</Form.Label>
            <Form.Control
              as="select"
              value={appointmentType}
              onChange={e => setAppointmentType(e.target.value)}
              disabled={loading}
            >
              {appointmentTypes.map(type => <option value={type.type} key={type.id}>{type.type}</option>)}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Location *</Form.Label>
            <Form.Control
              type='text'
              value={location}
              onChange={e => setLocation(e.target.value)}
              disabled={loading}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date *</Form.Label>
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

export default AppointmentModal;
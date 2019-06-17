/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import SubmitButton from './SubmitButton';
import { APPT_QUERY } from '../views/Appointments';

const ADD_APPT_MUTATION = gql`
  mutation($appointmentType: ID!, $date: String!, $description: String!, $location: String!) {
    addAppointment(
      appointmentType: $appointmentType,
      date: $date,
      description: $description,
      location: $location
    )
  }
`;

const modalStyles = css`
  .react-datepicker-wrapper {
    display: block;
    .react-datepicker__input-container {
      input {
        height: calc(1.5em + .75rem + 2px);
        padding: .375rem .75rem;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: .25rem;
        transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
      }
    }
  }
  .react-datepicker-popper {
    transform: translate3d(0px, 17px, -10px);
    .react-datepicker__month-container {
      width: 230px;
    }
  }
`;

const AppointmentModal = ({ show, onHide, appointmentTypes, client }) => {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [appointmentType, setAppointmentType] = useState(appointmentTypes[0].type);
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(moment.now());
  
  const onAddAppointment = async () => {
    const apptType = appointmentTypes.find(type => type.type === appointmentType);
    try {
      setLoading(true);
      await client.mutate({
        mutation: ADD_APPT_MUTATION,
        variables: { appointmentType: apptType.id, date: moment(date), description, location },
        refetchQueries: [{ query: APPT_QUERY }],
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
      css={modalStyles}
    >
      <Modal.Header closeButton>
        <Modal.Title>{`Add Appointment`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={e => {
            e.preventDefault();
            onAddAppointment();
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
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={5}
              dateFormat="dd/MM/yy HH:mm"
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

export default withApollo(AppointmentModal);
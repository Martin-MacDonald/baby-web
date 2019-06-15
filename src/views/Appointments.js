/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment, useState } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';
import Loading from './Loading';
import Tabber from '../components/Tabber';
import CardItem from '../components/CardItem';
import parseDate from '../helpers/parseDate';
import ActionButton from '../components/ActionButton';
import AppointmentModal from '../components/AppointmentModal';


const APPT_QUERY = gql`
  query {
    getAppointments {
      id
      date
      description
      location
      appointmentType {
        id
        type
      }
    }
    getAppointmentTypes {
      id
      type
    }
  }
`;

const Appointments = () => {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [showApptModal, setShowApptModal] = useState(false);
  const [appointmentTypes, setAppointmentTypes] = useState(null);
  const renderUpcoming = (appointments) => {
    return appointments
      .filter(appt => !parseDate(appt.date).isBefore(moment()))
      .sort((a, b) => parseDate(a.date) - parseDate(b.date))
      .map((appt, i) => (
        <CardItem
          key={i}
          title={parseDate(appt.date).format('DD/MM/YY')}
          subtitle={`${appt.location} - ${appt.appointmentType.type}`}
          text={appt.description}
          onClick={() => setSelectedAppt(appt.id)}
        />
      ))
  };
  const renderPassed = (appointments) => {
    return appointments
      .filter(appt => parseDate(appt.date).isBefore(moment()))
      .sort((a, b) => parseDate(b.date) - parseDate(a.date))
      .map((appt, i) => (
        <CardItem
          key={i}
          title={parseDate(appt.date).format('DD/MM/YY')}
          subtitle={`${appt.location} - ${appt.appointmentType.type}`}
          text={appt.description}
          onClick={() => setSelectedAppt(appt.id)}
        />
      ))
  };
  return (
    <Fragment>
      <Query query={APPT_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <Loading />
          if (error) return `Error! ${error.message}`;
          setAppointmentTypes(data.getAppointmentTypes);
          return (
            <Tabber
              activeKey={activeTab}
              onSelect={setActiveTab}
              tabs={['Upcoming', 'Passed']}
            >
              <Row>
                <Col>
                  <ActionButton
                    text='Add Appointment'
                    variant='success'
                    onClick={() => setShowApptModal(true)}
                  />
                  {renderUpcoming(data.getAppointments)}
                </Col>
              </Row>
              <Row>
                <Col>
                  {renderPassed(data.getAppointments)}
                </Col>
              </Row>
            </Tabber>
          );
        }}
      </Query>
      {
        showApptModal && 
        <AppointmentModal
          appointmentTypes={appointmentTypes}
          show={showApptModal}
          onHide={() => setShowApptModal(false)}
        />
      }
    </Fragment>
  );
};

export default Appointments;
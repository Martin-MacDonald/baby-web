import React from 'react';
import WelcomeCard from '../components/WelcomeCard';
import CountdownCard from '../components/CountdownCard';
import { Row, Col } from 'react-bootstrap';

const Home = () => {
  return (
    <Row>
      <Col>
        <WelcomeCard/>
        <CountdownCard/>
      </Col>
    </Row>
  );
};

export default Home;
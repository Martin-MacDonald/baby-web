import React, { useContext } from 'react';
import appContext from '../context/appContext';
import WelcomeCard from '../components/WelcomeCard';
import CountdownCard from '../components/CountdownCard';
import { Row, Col } from 'react-bootstrap';

const Home = () => {
  const { state } = useContext(appContext);
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
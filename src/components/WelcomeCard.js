/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useContext } from 'react';
import { Card } from 'react-bootstrap';
import appContext from '../context/appContext';

const cardStyle = css`
  margin-top: 10px;
`;

const WelcomeCard = () => {
  const { state } = useContext(appContext);
  const { parentType, name } = state.user;
  const greetingName = name.firstName.split(' ')[0];
  const getGreeting = () => {
    switch (parentType) {
      case 'father': return "Hope you are ready!";
      case 'mother': return "Martin loves you!";
      default: return "You are an unknown!";
    }
  };
  return (
    <Card css={cardStyle}>
      <Card.Body>
        <Card.Title>{`Hello, ${greetingName}`}</Card.Title>
        <Card.Text>{getGreeting()}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default WelcomeCard;
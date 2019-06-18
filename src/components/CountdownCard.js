/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Card } from 'react-bootstrap';
import { useState } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const cardStyle = css`
  margin-top: 10px;
  .card-text {
    display: flex;
    align-items: center;
    .cakeIcon {
      font-size: 30px;
      margin-right: 20px;
    }
    .switchIcon {
      position: absolute;
      top: 0;
      right: 0;
      margin: 10px 10px 0 0;
      cursor: pointer;
      &:active {
        font-size: 20px;
      }
    }
  }
`;

const CountdownCard = () => {
  const [countdownType, setCountdownType] = useState(0);
  const getCountdownText = () => {
    const days = moment().diff('2019-10-25', 'days') * -1;
    if (countdownType === 0) return `...in ${days} days`;
    const weeksRemainder = days % 7;
    return `...in ${Math.floor(days / 7)} weeks${weeksRemainder ? ` and ${weeksRemainder} days` : ''}`;
  };
  return (
    <Card css={cardStyle}>
      <Card.Body>
        <Card.Text>
          <FontAwesomeIcon
            className='switchIcon'
            onClick={() => countdownType ? setCountdownType(0) : setCountdownType(1)}
            icon='exchange-alt'
          />
          <FontAwesomeIcon
            className='cakeIcon'
            icon='baby'
          />
          {getCountdownText()}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CountdownCard;
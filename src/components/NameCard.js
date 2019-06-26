/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Card } from 'react-bootstrap';

const cardStyle = css`
  margin-top: 10px;
`;

const NameCard = ({ name }) => {
  return (
    <Card css={cardStyle}>
      <Card.Body>
        <Card.Text>{name}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default NameCard;
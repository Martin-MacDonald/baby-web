/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Card } from 'react-bootstrap';

const cardStyle = css`
  margin-top: 10px;
`;

const ShoppingCard = ({ item }) => {
  return (
    <Card css={cardStyle}>
      <Card.Body>
        <Card.Text>{item}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ShoppingCard;
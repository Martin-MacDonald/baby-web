/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Card } from 'react-bootstrap';

const cardStyle = css`
  margin-top: 10px;
`;

const CardItem = ({ title, subtitle, text, onClick }) => {
  return (
    <Card
      css={cardStyle}
      onClick={onClick}
    >
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>{subtitle}</Card.Subtitle>
        <Card.Text>{text}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardItem;
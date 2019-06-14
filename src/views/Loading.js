/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Row, Col, Spinner } from 'react-bootstrap';

const spinnerStyle = css`
  height: 100%;
  .col {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Loading = () => {
  return (
    <Row css={spinnerStyle}>
      <Col>
      <Spinner animation='border' />
      </Col>
    </Row>
  );
};

export default Loading;

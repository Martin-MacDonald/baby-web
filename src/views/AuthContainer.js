/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Container } from 'react-bootstrap';
import NavBar from '../components/NavBar';

const containerStyle = css`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  .container {
    flex: 1;
    margin-top: 15px;
    margin-bottom: 15px;
  }
`;

const AuthContainer = ({ children }) => {
  return (
    <div css={containerStyle}>
      <NavBar />
      <Container>
        {children}
      </Container>
    </div>
  );
};

export default AuthContainer;
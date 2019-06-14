/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'react-bootstrap';

const buttonStyle = css`
  svg {
    animation: spin 2s linear infinite;
  }
  @keyframes spin { 100% { transform:rotate(360deg) } }
`;

const SubmitButton = ({ text, disabled, ...rest }) => {
  return (
    <Button
      css={buttonStyle}
      block
      type="submit"
      disabled={disabled}
      {...rest}
    >
      {disabled ? <FontAwesomeIcon icon='baby' /> : text}
    </Button>
  );
};

export default SubmitButton;
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Button } from 'react-bootstrap';


const ActionButton = ({ text, variant, ...rest }) => {
  return (
    <Button
      block
      variant={variant ? variant : 'primary'}
      {...rest}
    >
      {text}
    </Button>
  );
};

export default ActionButton;
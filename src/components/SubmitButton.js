/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const buttonStyle = css`
  cursor: pointer;
  background-color: blue;
  width: 100%;
  color: white;
  border-radius: 5px;
  font-size: 20px;
`;

const SubmitButton = ({ ...props }) => {
  return (
    <input
      css={buttonStyle}
      type="submit"
      {...props}
    />
  );
};

export default SubmitButton;
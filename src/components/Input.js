/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const inputStyle = css`
  color: #B2DDF7;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  padding: 5px 10px;
`;

const Input = ({ title, ...props }) => {
  return (
    <input
      css={inputStyle}
      {...props}
    />
  );
};

export default Input;
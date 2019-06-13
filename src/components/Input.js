/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const inputStyle = css`
  padding: 0;
  width: 100%;
  input {
    width: 100%;
    box-sizing: border-box;
  }
`;

const Input = ({ title, ...props }) => {
  return (
    <fieldset
      css={inputStyle}
    >
      <legend>{title}</legend>
      <input {...props}/>
    </fieldset>
  );
};

export default Input;
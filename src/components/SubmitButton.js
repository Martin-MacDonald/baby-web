/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const buttonStyle = css`
  cursor: pointer;
  background-color: #81D6E3;
  width: 100%;
  color: white;
  border-radius: 5px;
  font-size: 20px;
  border: none;
  svg {
    font-size: 20px;
    animation: spin 2s linear infinite;
  }
  @keyframes spin { 100% { transform:rotate(360deg) } }
`;

const SubmitButton = ({ text, ...props }) => {
  return (
    <button
      css={buttonStyle}
      type="submit"
      {...props}
    >
      {text}
    </button>
  );
};

export default SubmitButton;
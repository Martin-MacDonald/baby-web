/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Tabs, Tab } from 'react-bootstrap';

const tabberStyle = css`
  margin-bottom: 10px;
`;

const Tabber = ({ tabs, children, ...props }) => {
  const renderTabs = () => (
    tabs.map((tab, i) => (
      <Tab eventKey={tab} title={tab} key={i}>
        {children[i]}
      </Tab>
    ))
  );
  return (
    <Tabs
      css={tabberStyle}
      {...props}
    >
      {renderTabs()}
    </Tabs>
  );
};

export default Tabber;
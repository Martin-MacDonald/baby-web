import React, { useState, Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import NameCard from '../components/NameCard';
import ActionButton from '../components/ActionButton';
import AddNameModal from '../components/AddNameModal';

const names = ['Alex', 'Charlie']

const Names = () => {
  const [showAddNameModal, setShowAddNameModal] = useState(false);
  const renderNameCards = (names) => {
    return names.map(name => <NameCard name={name} />);
  };

  return (
    <Fragment>
      <Row>
        <Col>
          <ActionButton
            text='Add Name'
            variant='success'
            onClick={() => setShowAddNameModal(true)}
          />
          {renderNameCards(names)}
        </Col>
      </Row>
      {
        showAddNameModal && 
        <AddNameModal
          show={showAddNameModal}
          onHide={() => setShowAddNameModal(false)}
        />
      }
    </Fragment>
  );
};

export default Names;
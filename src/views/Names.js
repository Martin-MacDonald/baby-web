import React, { useState, Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import NameCard from '../components/NameCard';
import ActionButton from '../components/ActionButton';
import AddNameModal from '../components/AddNameModal';
import Loading from './Loading';

export const GET_NAMES_QUERY = gql`
  query {
    getNames {
      id
      name
    }
  }
`;

const Names = () => {
  const [names, setNames] = useState(null);
  const [showAddNameModal, setShowAddNameModal] = useState(false);

  const renderNameCards = () => {
    if (!names) return;
    return names.map((name, i) => <NameCard key={i} name={name.name} />);
  };

  return (
    <Fragment>
      <Query query={GET_NAMES_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) return `Error! ${error.message}`;
          setNames(data.getNames)
          return (
            <Row>
              <Col>
                <ActionButton
                  text='Add Name'
                  variant='success'
                  onClick={() => setShowAddNameModal(true)}
                />
                {renderNameCards()}
              </Col>
            </Row>
          );
        }}
      </Query>
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
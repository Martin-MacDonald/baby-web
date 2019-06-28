import React, { Fragment, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ActionButton from '../components/ActionButton';
import AddShoppingModal from '../components/AddShoppingModal';
import Loading from './Loading';
import ShoppingCard from '../components/ShoppingCard';

export const GET_SHOPPING_QUERY = gql`
  query {
    getShoppingItems {
      id
      shoppingItem
      bought
    }
  }
`;

const ShoppingList = () => {
  const [shoppingItems, setShoppingItems] = useState([])
  const [showShoppingModal, setShowShoppingModal] = useState(false);

  const renderShoppingCards = () => {
    if (!shoppingItems) return;
    return shoppingItems.map((item, i) => <ShoppingCard item={item.shoppingItem} key={i} />);
  };

  return (
    <Fragment>
      <Query query={GET_SHOPPING_QUERY} >
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) return `Error! ${error.message}`;
          setShoppingItems(data.getShoppingItems)
          return (
            <Row>
              <Col>
                <ActionButton
                  text='Add to List'
                  variant='success'
                  onClick={() => setShowShoppingModal(true)}
                />
                {renderShoppingCards()}
              </Col>
            </Row>
          );
        }}
      </Query>
      {
        showShoppingModal &&
        <AddShoppingModal
          show={showShoppingModal}
          onHide={() => setShowShoppingModal(false)}
        />
      }
    </Fragment>
  );
};

export default ShoppingList;
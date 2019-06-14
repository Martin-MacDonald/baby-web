import React, { useContext } from 'react';
import appContext from '../context/appContext';

const Home = () => {
  const { state } = useContext(appContext);
  return (
    <div>{state.user.name.firstName}</div>
  );
};

export default Home;
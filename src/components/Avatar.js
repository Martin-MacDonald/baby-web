import React, { useContext } from 'react';
import { Image } from 'react-bootstrap';
import appContext from '../context/appContext';
import elephant from '../images/elephant.png';

const Avatar = () => {
  const { state } = useContext(appContext);
  const { parentType } = state.user;
  const getAvatarImage = () => {
    switch (parentType) {
      case 'mother': return elephant;
      case 'father': return;
      default: return elephant;
    }
  };
  return (
    <Image
      roundedCircle
      src={getAvatarImage()}
    />
  );
};

export default Avatar;
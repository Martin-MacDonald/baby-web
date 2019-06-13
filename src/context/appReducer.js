import { SET_USER } from './types';

export const initialState = {
  user: '',
};

export default (state, action) => {
  switch(action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
/* eslint-disable no-unused-vars */
/* eslint-disable no-fallthrough */
import { POST_USER, LOGIN_USER, GET_USER } from "./ActionsTypes";
let inicialState = {
  user: [],
  userId: [],
};

const rootReducer = (state = inicialState, action) => {
  switch (action.type) {
    case POST_USER:
      return {
        ...state,
        user: action.payload,
      };

    case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        userId: action.payload,
      };
  }
  return state;
};

export default rootReducer;

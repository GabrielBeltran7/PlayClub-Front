/* eslint-disable no-unused-vars */
/* eslint-disable no-fallthrough */
import {
  POST_USER,
} from "./ActionsTypes";
let inicialState = {
  user: [],
};
const rootReducer = (state = inicialState, action) => {
  switch (action.type) {

    case POST_USER:
      return {
        ...state,
        user: action.payload,
      };
    }
  return state;
};

export default rootReducer;

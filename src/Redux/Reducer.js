/* eslint-disable no-unused-vars */
/* eslint-disable no-fallthrough */
import {
  POST_USER,
  LOGIN_USER,
  GET_USER,
  POST_CORREDOR,
  POST_PUNTOS,
  POST_CARRERA,
} from "./ActionsTypes";
let inicialState = {
  user: [],
  userId: [],
  corredor: [],
  puntos: [],
  carrera: [],
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
    case POST_CORREDOR:
      return {
        ...state,
        corredor: action.payload,
      };
    case POST_PUNTOS:
      return {
        ...state,
        puntos: action.payload,
      };
    case POST_CARRERA:
      return {
        ...state,
        puntos: action.payload,
      };
  }
  return state;
};

export default rootReducer;

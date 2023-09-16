/* eslint-disable no-unused-vars */
/* eslint-disable no-fallthrough */
import {
  POST_USER,
  LOGIN_USER,
  GET_USER,
  POST_CORREDOR,
  POST_PUNTOS,
  POST_CARRERA,
  GET_USER_LOGIN,
} from "./ActionsTypes";
let inicialState = {
  isAuthenticated: false,
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
        isAuthenticated: true,
        user: action.payload,
      };
      case 'LOGOUT_USER':
        return {
          ...state,
          isAuthenticated: false,
          user: "Deslogueado"
        };
    case GET_USER:
      return {
        ...state,
        userId: action.payload,
      };
      case GET_USER_LOGIN:
        return {
          ...state,
          user: action.payload,
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

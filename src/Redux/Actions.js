/* eslint-disable no-unused-vars */
import {
  POST_USER,
  LOGIN_USER,
  GET_USER,
  POST_CORREDOR,
  POST_PUNTOS,
  POST_CARRERA,
  GET_USER_LOGIN,
  LOGOUT_USER
} from "./ActionsTypes";
import axios from "axios";
// import swal from "sweetalert2";




export const getUserByUsername = (username) => {
  console.log("pruebaiddddddddddddddd", username)
 
  return async (dispatch) => {
    try {
      const response = (await axios.get(`http://localhost:3001/users/getUserByUsername/${username}`)).data;
      console.log("prueba2222222222222RESPONSE", response)
      dispatch({ 
        type: GET_USER_LOGIN, 
        payload: response });
      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const postUser = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:3001/users", user);
      dispatch({ type: POST_USER, payload: response.data });
      console.log("response postuser", response);
      return response;
    } catch (error) {
      console.log("errorrrrr", error);
    }
  };
};

export const loginUser = (user) => {
  //console.log("loginUser", user);
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/users/login",
        user
      );
      //console.log("response de login user", response);
      dispatch({ type: LOGIN_USER, payload: response.data });
      return response;
    } catch (error) {
      //console.log("errorrrrr", error);
      throw error;
    }
  };
};

export const getUserById = (id) => {
  console.log("el id de la actionnnn", id);
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/users/", {
        id: id,
      });
      dispatch({ type: GET_USER, payload: response.data });
      console.log("el responseeeee", response.data);
      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const getUserByIdParams = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/users/${id}`);
      dispatch({ type: GET_USER, payload: response.data });
      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const postCorredor = (corredor) => {
  console.log("corredor action", corredor);
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/admin/corredor",
        corredor
      );
      dispatch({ type: POST_CORREDOR, payload: response.data });
      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const cargaPuntos = (user) => {
  console.log("usuario a cargar", user);
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/admin/puntos",
        user
      );
      dispatch({ type: POST_PUNTOS, payload: response.data });
      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const crearCarrera = (carrera) => {
  console.log("carrera action", carrera);
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/admin/carrera",
        carrera
      );
      dispatch({ type: POST_CARRERA, payload: response.data });
      return response;
    } catch (error) {
      throw error;
    }
  };
};


export function logoutUser(){
  return  function (dispatch){
     return dispatch ({
         type: LOGOUT_USER, 
     })
  }
}
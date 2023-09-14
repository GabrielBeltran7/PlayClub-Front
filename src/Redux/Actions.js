/* eslint-disable no-unused-vars */
import { POST_USER, LOGIN_USER, GET_USER } from "./ActionsTypes";
import axios from "axios";
// import swal from "sweetalert2";

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
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/users/", id);
      dispatch({ type: GET_USER, payload: response.data });
      return response;
    } catch (error) {
      throw error;
    }
  };
};

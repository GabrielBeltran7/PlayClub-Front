/* eslint-disable no-unused-vars */
import Swal from "sweetalert2";
import { POST_USER } from "./ActionsTypes";

import axios from "axios";
// import swal from "sweetalert2";

export const postUser = (user) => {
  console.log("usuario", user);
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "https://cellxpress.onrender.com/",
        user
      );
      dispatch({ type: POST_USER, payload: response.data });
      alert(`${user.name} Bienvenido  a CELLXPRESS`);
      console.log(response);
      return response;
    } catch (error) {
      alert(error.response.data.message);
    }
  };
};
